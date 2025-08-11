import "./stylePanel.css"

const LivesBar = ({ maxMisses, missCount }) => {
  const livesLeft = Math.max(maxMisses - missCount, 0);

  return (
    <div className="lives-bar" 
   >
      {Array.from({ length: maxMisses }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < livesLeft ? 'red' : 'white',
          }}
          aria-label={i < livesLeft ? "Жизнь" : "Потерянная жизнь"}
          >
            ♥
        </span>
        
      ))}
    </div>
  );
};

export default LivesBar;
