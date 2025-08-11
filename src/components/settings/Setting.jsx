import { useState, useCallback } from "react"; // Добавлен useCallback
import "./settings.css";

import zombieImgDefault from "../../img/zombie.png";

const Setting = ({ onBack, onSaveSettings, initialSettings }) => {
  const [zombieCount, setZombieCount] = useState(initialSettings?.zombieCount || 1);
  const [imgZombie, setImgZombie] = useState(initialSettings?.imgZombie || zombieImgDefault);
  const [maxMisses, setMaxMisses] = useState(initialSettings?.maxMisses || 9);
  const [difficultyLevel, setDifficultyLevel] = useState(initialSettings?.difficultyLevel || "easy");
  const [backgroundImage, setBackgroundImage] = useState(initialSettings?.backgroundImage || 'wall');
  const [weapon, setWeapon] = useState(initialSettings?.weapon || "shotgun")

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImgZombie(event.target.result); // исправлено на setImgZombie
      alert("Новое изображение зомби загружено и будет использовано!");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Передаем настройки родителю, добавим imgZombie, если нужно
    onSaveSettings({ zombieCount, maxMisses, difficultyLevel, backgroundImage, imgZombie, weapon });
    onBack();
  };

  return (
    <div className="settings">
      <h2>Настройки игры</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Количество зомби:
          <select value={zombieCount} onChange={(e) => setZombieCount(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>

        <br />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <div style={{ width: 200, height: 200 }}>
            <img src={imgZombie} alt="Zombie" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
          <input type="file" id="upload-image" accept="image/*" onChange={handleImageUpload} />
        </div>
        <br />

        <label>
          Количество жизни :
          <select value={maxMisses} onChange={(e) => setMaxMisses(Number(e.target.value))}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={9}>9</option>
          </select>
        </label>
        <br />

        <label>
          уровень сложности
          <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
            <option value={"easy"}>easy</option>
            <option value={"normal"}>normal</option>
            <option value={"hard"}>hard</option>
          </select>
        </label>
        <br />

        <label>
          локация
          <select value={backgroundImage} onChange={(e) => setBackgroundImage(e.target.value)}>
            <option value={"img1"}>старый завод</option>
            <option value={"img2"}>пустыня</option>
            <option value={"wall"}>керпичная стена</option>
          </select>
        </label>
         <br />
        <label>
          оружие
          <select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
            <option value={"shotgun"}>дробовик</option>
            <option value={"katana"}>катана</option>
            <option value={"magnum"}>магнум</option>
          </select>
        </label>

        <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
          <button className="btn_settings" type="submit">Сохранить</button>
          <button className="btn_settings" type="button" onClick={onBack} style={{ marginLeft: "10px" }}>
            Назад в меню
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
