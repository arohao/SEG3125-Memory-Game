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

  const BONUS_THRESHOLD = 60;
  const BONUS_POINTS = 500;

  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [remainingMoves, setRemainingMoves] = useState(difficulties.Medium);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [difficulty, setDifficulty] = useState('Medium');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved) : 0;
  });

  const [startTime, setStartTime] = useState(null);

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
    setStartTime(Date.now());
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

        setScore((prev) => prev + 200);
        setTimeout(resetTurn, 800);
      } else {
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
    if (cards.length && cards.every((card) => card.isMatched)) {
      const timeTaken = (Date.now() - startTime) / 1000;
      let finalScore = score;

      if (timeTaken <= BONUS_THRESHOLD) {
        finalScore += BONUS_POINTS;
        setScore(finalScore);
      }

      if (finalScore > highScore) {
        setHighScore(finalScore);
        localStorage.setItem('highScore', finalScore);
      }

      setShowWin(true);
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
          <p>Try again and beat your high score!</p>
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
          {score > highScore ? <p>🎉 New Record!</p> : null}
          {(Date.now() - startTime) / 1000 <= BONUS_THRESHOLD && (
            <p> Bonus +{BONUS_POINTS} for fast completion!</p>
          )}
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
