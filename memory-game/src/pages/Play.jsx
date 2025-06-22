import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Card from '../components/Card';
import '../styles/App.css';
import { images } from '../assets/cards/images';
import { Modal, Button, Dropdown } from 'react-bootstrap';

function Play() {
  const difficulties = {
    Easy: 8,
    Medium: 5,
    Hard: 3,
  };

  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [remainingMoves, setRemainingMoves] = useState(difficulties.Medium);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const shuffleCards = () => {
    const shuffled = [...images, ...images]
      .map((img) => ({ ...img, id: Math.random(), isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffled);
    setRemainingMoves(difficulties[difficulty]);
    setShowGameOver(false);
    setShowWin(false);
    setScore(0);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    if (!disabled && card !== firstChoice) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      const isMatch = firstChoice.src === secondChoice.src;

      if (isMatch) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === firstChoice.src ? { ...card, isMatched: true } : card
          )
        );

        // Add points
        setScore((prev) => {
          const newScore = prev + 200;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });

        setTimeout(resetTurn, 800);
      } else {
        // Deduct points + reduce remaining moves
        setTimeout(() => {
          setScore((prev) => Math.max(prev - 50, 0));
          setRemainingMoves((prev) => {
            const updated = prev - 1;
            if (updated <= 0) {
              setShowGameOver(true);
              setDisabled(true);
            }
            return updated;
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    // Win check
    if (cards.length && cards.every((card) => card.isMatched)) {
      setShowWin(true);
      if (score > highScore) setHighScore(score);
    }
  }, [cards]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, [difficulty]);

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav />

      <div className="game-container flex-grow-1 d-flex flex-column gap-4 align-items-center justify-content-center text-center px-4 py-5">
        <h1 className="my-0">Memory Match</h1>
        <p className="fs-5 mb-2">Match cards to earn points. Watch out—mistakes cost you!</p>

        <div className="d-flex flex-column align-items-center gap-2">
          <Dropdown onSelect={handleDifficultyChange}>
            <Dropdown.Toggle variant="outline-primary" id="difficulty-dropdown">
              Difficulty: {difficulty}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(difficulties).map((level) => (
                <Dropdown.Item eventKey={level} key={level}>
                  {level}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <div className="text-muted">Remaining Mistakes: {remainingMoves}</div>
          <div className="text-success">Score: {score}</div>
          <div className="text-primary">High Score: {highScore}</div>
        </div>

        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === firstChoice || card === secondChoice || card.isMatched}
              disabled={disabled}
            />
          ))}
        </div>

        <button onClick={shuffleCards} className="btn btn-primary mt-4">New Game</button>
      </div>

      <Footer />

      {/* Game Over Modal */}
      <Modal show={showGameOver} onHide={() => setShowGameOver(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You ran out of moves! Final Score: {score}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGameOver(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={shuffleCards}>
            New Game
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Win Modal */}
      <Modal show={showWin} onHide={() => setShowWin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>You Win!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You matched all the cards!</p>
          <p>Your Score: {score}</p>
          <p>🏆 High Score: {highScore}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={shuffleCards}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Play;
