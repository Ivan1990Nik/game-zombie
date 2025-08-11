import React, { useEffect, useRef, useState } from "react";
import soundBu from "../../../sound/bu.mp3";
import soundShot from "../../../sound/shot.mp3";
import katanaShot from "../../../sound/katanablood.mp3";

const AudioManager = ({ soundOn, playShotSound, weapon }) => {
  const buAudioRef = useRef(null);
  const shotAudioRef = useRef(null);
  const [currentShotSound, setCurrentShotSound] = useState(soundShot); // По умолчанию используем soundShot

  useEffect(() => {
    // Обновляем звук выстрела в зависимости от weapon
    if (weapon === "katana") {
      setCurrentShotSound(katanaShot);
    } else {
      setCurrentShotSound(soundShot);
    }
  }, [weapon]);

  useEffect(() => {
    if (!buAudioRef.current || !shotAudioRef.current) return;

    if (soundOn) {
      buAudioRef.current.play().catch(() => {
        // обработка ошибок автоплея
      });
    } else {
      buAudioRef.current.pause();
      buAudioRef.current.currentTime = 0;
      shotAudioRef.current.pause();
      shotAudioRef.current.currentTime = 0;
    }
  }, [soundOn]);

  // Воспроизведение звука выстрела по вызову playShotSound
  useEffect(() => {
    if (playShotSound && soundOn && shotAudioRef.current) {
      shotAudioRef.current.src = currentShotSound; // Устанавливаем текущий звук выстрела
      shotAudioRef.current.currentTime = 0;
      shotAudioRef.current.play();
    }
  }, [playShotSound, soundOn, currentShotSound]); // Добавляем currentShotSound в зависимости

  return (
    <>
      <audio id="sound-bu" src={soundBu} loop ref={buAudioRef} />
      <audio id="sound-shot" src={currentShotSound} ref={shotAudioRef} />
    </>
  );
};

export default AudioManager;
