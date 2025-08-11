

import { useState } from "react";
import "./mainMenu.css";
import Game from "../game/Game";
import Setting from "../settings/Setting";
import zombieImgDefault from "../../img/zombie.png";
function MainMenu() {
  const [screen, setScreen] = useState("menu");
  const [settings, setSettings] = useState(null); // null — настройки не установлены
  const [settingsSet, setSettingsSet] = useState(false);






  // Быстрая игра с дефолтными настройками



  const startGameWithSettings = () => {
    if (!settingsSet) return; // дополнительная защита
    setScreen("game");
      
  };

const startQuickGame = () => {
  const newSettings = { zombieCount: 1 , maxMisses: 5,  imgZombie: zombieImgDefault };
  setSettings(newSettings);
  setSettingsSet(true);
  setSettingsSet(false);
  setScreen("game");

};

  if (screen === "game") {
    return <Game onBack={() => setScreen("menu")} settings={settings} />;
  } else if (screen === "settings") {
    return (
      <Setting
        onBack={() => setScreen("menu")}
        onSaveSettings={(newSettings) => {
          setSettings(newSettings);
          setSettingsSet(true);
          setScreen("menu");
           
          
          
          
          console.log( newSettings);
        
        
        
        }}
        initialSettings={settings || { zombieCount: 1, }}
      />
    );
  }

  return (
    <div className="wrapper">
      <div className="main-container">
        <div className="main-title">
          <svg width="600" height="150" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffd700" />
                <stop offset="50%" stop-color="#ffec8b" />
                <stop offset="100%" stop-color="#b80b0bff" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#ffec8b" />
              </filter>
            </defs>
            <text x="50%" y="75" font-family="Georgia, serif" font-size="72" font-weight="bold" fill="url(#gold)"
              text-anchor="middle" dominant-baseline="middle" filter="url(#glow)"
              transform-origin="50% 50%">
              <animateTransform attributeName="transform" attributeType="XML" type="scale" begin="0s" dur="3s" values="1 1;1 2;1 1" repeatCount="indefinite" />
              ZOMBIE
            </text>
          </svg>
        </div>
        <div className="main-menu">
          <button
            className="main-menu--btn"
            onClick={startGameWithSettings}
            disabled={!settingsSet}
            title={!settingsSet ? "Сначала установите настройки" : ""}
          >
            Старт
          </button>
          <button className="main-menu--btn" onClick={startQuickGame}>
            Быстрая Игра
          </button>
          <button className="main-menu--btn" onClick={() => setScreen("settings")}>
            Настройки
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
