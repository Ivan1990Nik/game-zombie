
const GamePanel = ({ hitCount, missCount, soundOn, toggleSound, onBack, livesBar, pauseGame, setPauseGame }) => {

    return (
        <div className="game-panel">
            <div className="btn-panel">
                <button onClick={() => setPauseGame(prev => !prev)}>
          {pauseGame ? "Продолжить" : "Пауза"}
        </button>
                <button onClick={onBack}>Назад в меню</button>
                <button id="sound-btn" onClick={toggleSound}>
                    {soundOn ? "SOUND ON" : "SOUND OFF"}
                </button>
            </div>
            <div className="weapon_panel"></div>
            <div>
                <div className="counter">
                    убил: <span id="hit-counter">{hitCount} </span>
                </div>
                <div className="counter">
                    вас укусило: <span id="miss-counter">{missCount} </span>
                </div>
                {livesBar}
            </div>

        </div>
    )
};

export default GamePanel;
