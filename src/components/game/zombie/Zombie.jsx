
const Zombie = ({ src, onHit }) => {
    return (
        <img
            src={src}
            alt="zombie"
            className="zombie-image"
            onClick={onHit}

        />
    )
};

export default Zombie;