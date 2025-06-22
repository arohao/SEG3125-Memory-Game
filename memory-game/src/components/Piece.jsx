function piece({ piece, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(piece);
    }
  };

  return (
    <div className="piece">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={piece.src} alt="piece front" />
        <div className="back" onClick={handleClick}></div>
      </div>
    </div>
  );
}

export default piece;
