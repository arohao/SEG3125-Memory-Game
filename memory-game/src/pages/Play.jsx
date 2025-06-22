import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Card from '../components/Card';
import '../styles/App.css';
import { images } from '../assets/cards/images';
import { Modal, Button } from 'react-bootstrap';

function Play() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffled = [...images, ...images]
      .map((img) => ({ ...img, id: Math.random(), isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffled);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === firstChoice.src ? { ...card, isMatched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
    <Nav/>
    
      <div className="game-container flex-grow-1 d-flex flex-column gap-5 align-items-center justify-content-center text-center px-4 py-5">
        <h1 className='my-0'>Memory Match</h1>
        <p className="mb-4 fs-5">
          Flip and match all the cards — how fast can you remember?
        </p>
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
        <button onClick={shuffleCards} className="btn btn-primary mb-4">New Game</button>
      </div>
      <Footer/>
    </div>
  );
}


export default Play;
