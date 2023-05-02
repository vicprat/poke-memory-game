import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import confetti from "canvas-confetti";

import SingleCard from "../components/SingleCard";
import Layout from "../layout/Layout";
import Button from "../components/Button";
import Title from "../components/Title";
import GridContainer from "../components/GridContainer";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";
import GithubButton from "../components/GithubButton";

import { Card } from "../types";
import { useRandomFetch } from "../hooks/useRandomFetch";

import {
  incrementTurns,
  incrementFails,
  resetGame,
  setIsModalOpen,
  setModalMessage,
  setGameStarted,
  setGameWon,
  setDisabled,
  setChoiceOne,
  setChoiceTwo,
} from "../store/game/gameSlice";
import {
  selectTurns,
  selectFails,
  selectIsModalOpen,
  selectModalMessage,
  selectGameWon,
  selectDisabled,
  selectChoiceOne,
  selectChoiceTwo,
} from "../store/game/gameSelector";

function Home() {
  const dispatch = useDispatch();
  // Random Cards Logic
  const [difficulty, setDifficulty] = useState<{
    count: number;
    max: number;
  } | null>(null);
  const { data: cardImages, loading } = useRandomFetch(
    difficulty?.count,
    difficulty?.max
  );
  const [cards, setCards] = useState<Card[]>([]);
  // Game Logic
  const turns = useSelector(selectTurns);
  const fails = useSelector(selectFails);
  const gameWon = useSelector(selectGameWon);
  const disabled = useSelector(selectDisabled);
  const choiceOne = useSelector(selectChoiceOne);
  const choiceTwo = useSelector(selectChoiceTwo);
  // Modal Logic
  const isModalOpen = useSelector(selectIsModalOpen);
  const modalMessage = useSelector(selectModalMessage);

  // Set the cards when the cardImages with seleceted difficulty
  useEffect(() => {
    if (cardImages && difficulty) {
      shuffleCards(difficulty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, cardImages]);

  // Shuffle the cards
  const shuffleCards = async (difficulty: { count: number; max: number }) => {
    setDifficulty(difficulty);
    if (!gameWon && cardImages) {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

      dispatch(setChoiceOne(null));
      dispatch(setChoiceTwo(null));
      setCards(shuffledCards);
      dispatch(setDisabled(false));
      dispatch(resetGame());
      dispatch(setGameStarted());
    }
  };

  // Handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? dispatch(setChoiceTwo(card)) : dispatch(setChoiceOne(card));
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      dispatch(setDisabled(true));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceOne, choiceTwo, dispatch]);

  //reset choices and increase turns
  const resetTurn = () => {
    dispatch(setChoiceOne(null));
    dispatch(setChoiceTwo(null));
    dispatch(incrementTurns());
    dispatch(setDisabled(false));
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
      dispatch(
        setModalMessage(
          "You won! Congratulations! Click a card to get more details 🎉"
        )
      );
      dispatch(setIsModalOpen(true));
      dispatch(setGameWon(true));
    } else if (fails >= 5) {
      dispatch(setModalMessage("You lost! Try again"));
      dispatch(setIsModalOpen(true));
      dispatch(setDisabled(true));
    }
  }, [cards, fails, dispatch]);

  // // Close modal
  const closeModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const columnCount = difficulty?.count;

  return (
    <Layout>
      <h1 className='font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 my-2'>
        Pokemon memory game
      </h1>
      <Title text='Select difficulty' />
      <div className='grid grid-cols-3 gap-4'>
        <Button onClick={() => shuffleCards({ count: 4, max: 1000 })}>
          Easy
        </Button>
        <Button onClick={() => shuffleCards({ count: 5, max: 1000 })}>
          Normal
        </Button>
        <Button onClick={() => shuffleCards({ count: 8, max: 1000 })}>Hard</Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <GridContainer columns={columnCount}>
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
      <div className='mt-8 text-center'>
        <p>Turns: {turns}</p>
        <GithubButton />
      </div>
      {isModalOpen && <Modal onClose={closeModal}>{modalMessage}</Modal>}
    </Layout>
  );
}

export default Home;
