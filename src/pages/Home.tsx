import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import confetti from 'canvas-confetti'

import SingleCard from '../components/SingleCard'
import Layout from '../layout/Layout';
import Button from '../components/Button';
import Title from '../components/Title';
import GridContainer from '../components/GridContainer';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

import { Card } from '../types';
import { useRandomFetch } from '../hooks/useRandomFetch';

import {
  incrementTurns,
  incrementFails,
  resetGame,
} from '../store/game/gameSlice';
import { selectTurns, selectFails } from '../store/game/gameSelector'

function Home() {
  const dispatch = useDispatch();
// Random Cards Logic
  const { data: cardImages, loading } = useRandomFetch(5, 1000);
  const [cards, setCards] = useState<Card[]>([]);
// Game Logic
  const [gameStarted, setGameStarted] = useState(false);
  const turns = useSelector(selectTurns);
  const fails = useSelector(selectFails);
  const [gameWon, setGameWon] = useState(false);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
// Modal Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

// Shuffle the cards
const shuffleCards = async () => {
  if (!gameWon && cardImages) {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setDisabled(false);
    dispatch(resetGame());
    setGameStarted(true);
  }
};

  // Handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.name === choiceTwo.name) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === choiceOne.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
          dispatch(incrementFails());
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo, dispatch]);
  
    console.log(cards)
  
    //reset choices and increase turns
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      dispatch(incrementTurns());
      setDisabled(false);
    };
  
  // Check if the game is won
  useEffect(() => {
    const matchedCards = cards.filter((card) => card.matched).length;
    if (matchedCards === cards.length && cards.length > 0 && fails < 5) {
      confetti({
        particleCount: 100,
        spread: 70,
        drift: 1,
        origin: {
          y: 0.6,
        },
      });
      setModalMessage('You won! Congratulations! Click a card to get more details 🎉');
      setIsModalOpen(true);
      setGameWon(true);
    } else if (fails >= 5) {
      setModalMessage('Perdiste. ¡Inténtalo de nuevo!');
      setIsModalOpen(true);
      setDisabled(true);
    }
  }, [cards, fails, dispatch]);

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
    return (
      <Layout>
        <Title text='Pokemon memory game' />
        <Button onClick={shuffleCards}>Start a new game</Button>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <GridContainer>
              {cards.map((card) => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                  gameWon={gameWon}
                />
              ))}
            </GridContainer>
          )}
        <div className="mt-8">
          <p>Turns: {turns}</p>
        </div>
        {isModalOpen && (
            <Modal onClose={closeModal}>{modalMessage}</Modal>
          )}
    </Layout>
    )
  }
  
export default Home;