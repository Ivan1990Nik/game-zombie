import Zombie from "../zombie/Zombie";
import HitMark from "../hitMark/HitMark";

import img1 from '../../../img/imgLocations/img1.jpg';
import img2 from '../../../img/imgLocations/img2.webp';
import wall from '../../../img/imgLocations/wall.jpg';

const backgrounds = {
  img1,
  img2,
  wall,
};

const GameGrid = ({ cells, zombieImageSrc, handleHit, backgroundImage, weapon }) => {
    return (
        <div className="container" style={{
      backgroundImage: `url(${backgrounds[backgroundImage] || wall})`, // fallback на wall
  
    }}>
            {cells.map((cell, i) => (
                <div key={i} className="item">
                    {cell.hasZombie && <Zombie src={zombieImageSrc} onHit={() => handleHit(i)} />}
                    {cell.hit && <HitMark weapon={weapon}/>}
                </div>
            ))}
        </div>
    )
};

export default GameGrid;