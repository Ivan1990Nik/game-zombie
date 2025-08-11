import bloodImg from "../../../img/blood.png";
import bloodImg2 from "../../../img/bloodKatana.png";

const HitMark = ({weapon}) => {



 const setWeapon = (() => {
      switch (weapon) {
        case "shotgun":
          return <img src={bloodImg} alt="hit" className="hit-image" />; 
        case "katana":
          return <img src={bloodImg2} alt="hit" className="hit-image" />; 
       
        default:
          return <img src={bloodImg} alt="hit" className="hit-image" />; 
      }
    })();


  return (
    
<div>
  {setWeapon}
</div>
)
};

export default HitMark;