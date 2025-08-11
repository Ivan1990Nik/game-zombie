// src/components/Game.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./game.css";

import GamePanel from "./gamePanel/GamePanel";
import GameGrid from "./gameGrid/GameGrid";
import LivesBar from "./gamePanel/LivesBar";
import AudioManager from "./audioManager/AudioManager"; // Импортируем новый компонент

export function Game({ onBack, settings }) {
  const { zombieCount = 1, maxMisses = 9, difficultyLevel, backgroundImage, imgZombie, weapon } = settings || {};

  const [hitCount, setHitCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);
  const [playShotSound, setPlayShotSound] = useState(false);

  const [cells, setCells] = useState(() =>
    Array(15).fill({ hasZombie: false, hit: false })
  );

  const hitsThisRoundRef = useRef(0);
  const intervalRef = useRef(null);

  const showZombies = useCallback(() => {
    setCells((prevCells) => {
      const cleared = prevCells.map(() => ({ hasZombie: false, hit: false }));
      const usedIndexes = new Set();
      while (usedIndexes.size < zombieCount) {
        const randomIndex = Math.floor(Math.random() * cleared.length);
        usedIndexes.add(randomIndex);
      }

      usedIndexes.forEach((index) => {
        cleared[index] = { hasZombie: true, hit: false };
      });

      return cleared;
    });
    hitsThisRoundRef.current = 0;
  }, [zombieCount]);



  const handleHit = useCallback(
    (index) => {
      if (pauseGame || gameOver) return;

      setCells((prevCells) => {
        if (!prevCells[index].hasZombie || prevCells[index].hit) return prevCells;

        const newCells = [...prevCells];
        newCells[index] = { hasZombie: false, hit: true };
        return newCells;
      });

      hitsThisRoundRef.current += 1;
      setHitCount((prev) => prev + 1);

      if (soundOn) {
        setPlayShotSound(true);
      }
    },
    [soundOn, pauseGame, gameOver]
  );


  useEffect(() => {
    if (playShotSound) {
      const timeout = setTimeout(() => setPlayShotSound(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [playShotSound]);


  const toggleSound = useCallback(() => {
   
    setSoundOn((prev) => !prev);
  }, []);

  useEffect(() => {
    if (gameOver || pauseGame) {
      clearInterval(intervalRef.current);
      return;
    }

    showZombies();

    const intervalDuration = (() => {
      switch (difficultyLevel) {
        case "easy":
          return 2000; // 2 секунды
        case "normal":
          return 1200; // 1.2 секунды
        case "hard":
          return 800; // 0.8 секунды
        default:
          return 2000; // Значение по умолчанию
      }
    })();

    intervalRef.current = setInterval(() => {
      const missedThisRound = zombieCount - hitsThisRoundRef.current;
      if (missedThisRound > 0) {
        setMissCount((prev) => {
          const newMissCount = prev + missedThisRound;
          if (newMissCount >= maxMisses) {
            setGameOver(true);
            clearInterval(intervalRef.current);
          }
          return newMissCount;
        });
      }

      showZombies();
    }, intervalDuration);

    return () => clearInterval(intervalRef.current);
  }, [showZombies, zombieCount, maxMisses, gameOver, difficultyLevel, pauseGame, ]);

  if (gameOver) {
    return (
      <div className="game-over-screen" style={{ textAlign: "center", padding: 20 }}>
        <h2>Вы проиграли!</h2>
        <p>Вас убили </p>
        <button onClick={onBack} style={{ padding: "8px 16px", fontSize: 16 }}>
          В меню
        </button>
      </div>
    );
  }

  return (
    <div>
      <GamePanel
        livesBar={<LivesBar maxMisses={maxMisses} missCount={missCount} />}
        hitCount={hitCount}
        missCount={missCount}
        soundOn={soundOn}
        toggleSound={toggleSound}
        onBack={onBack}
        pauseGame={pauseGame}
        setPauseGame={setPauseGame}
      />
      <GameGrid
        cells={cells}
        weapon={weapon}
        zombieImageSrc={imgZombie}
        handleHit={handleHit}
        backgroundImage={backgroundImage}
      />
      <AudioManager
      weapon={weapon}
        soundOn={soundOn}
        playShotSound={playShotSound} />
    </div>
  );
}

export default Game;
