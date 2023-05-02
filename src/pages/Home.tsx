import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

import SingleCard from "../components/SingleCard";
import Layout from "../layout/Layout";
import Button from "../components/Button";
import Title from "../components/Title";
import GridContainer from "../components/GridContainer";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

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

  console.log(cards);

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
      <Link to='https://github.com/vicprat/poke-memory-game'>
        <button
          type='button'
          className=' mt-4 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'>
          <svg
            className='w-4 h-4 mr-2 -ml-1'
            aria-hidden='true'
            focusable='false'
            data-prefix='fab'
            data-icon='github'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 496 512'>
            <path
              fill='currentColor'
              d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
          </svg>
          Github
        </button>
      </Link>
      <div className='grid grid-cols-3 gap-4'>
        <Button onClick={() => shuffleCards({ count: 4, max: 1000 })}>
          4{" "}
        </Button>
        <Button onClick={() => shuffleCards({ count: 5, max: 1000 })}>
          5{" "}
        </Button>
        <Button onClick={() => shuffleCards({ count: 8, max: 1000 })}>8</Button>
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
      <div className='mt-8'>
        <p>Turns: {turns}</p>
      </div>
      {isModalOpen && <Modal onClose={closeModal}>{modalMessage}</Modal>}
    </Layout>
  );
}

export default Home;
