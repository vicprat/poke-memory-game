import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  incrementTurns,
  incrementFails,
  resetGame,
  selectTurns,
  selectFails,
} from '../store/gameSlice';
import SingleCard from '../components/SingleCard';

export type Card = {
  id: number;
  src: string;
  name: string;
  matched: boolean;
  pokemonId: number;
};

function Home() {
  const [cardImages, setCardImages] = useState<Card[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const dispatch = useDispatch();
  const turns = useSelector(selectTurns);
  const fails = useSelector(selectFails);

  const [cards, setCards] = useState<Card[]>([]);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);

  const generateRandomNumbers = (count: number, max: number) => {
    const numbers = new Set<number>();

    while (numbers.size < count) {
      const randomNumber = Math.floor(Math.random() * max) + 1;
      numbers.add(randomNumber);
    }

    return Array.from(numbers);
  };

  // Shuffle the cards
  const shuffleCards = async () => {
    if (!gameWon) {
      await fetchCardImages(); // Fetch new card images before shuffling only if the game is not won
    }
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    dispatch(resetGame());
  };

  // Fetch random card images
  const fetchCardImages = async () => {
    const randomNumbers = generateRandomNumbers(5, 151);
    const requests = randomNumbers.map((number) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
    );

    try {
      const responses = await Promise.all(requests);
      const pokemon = responses.map((response) => {
        const { id, name, sprites } = response.data;
        return {
          id: Math.random(),
          pokemonId: id,
          name,
          src: sprites.front_default,
          matched: false,
        };
      });

      setCardImages(pokemon);
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
    }
  };

  // Handle a choice
  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

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
        alert('¡Has ganado! Ahora puedes elegir una tarjeta para conocer los detalles del Pokémon.');
        setGameWon(true);
    } else if (fails >= 5) {
        alert('Perdiste. ¡Inténtalo de nuevo!');
        dispatch(resetGame());
    }
    }, [cards, fails, dispatch]);

  
    return (
      <>
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bock text-center">
        <h1 className="text-xl text-gray-600">Pokemon memory game</h1>
        <button onClick={shuffleCards} className="mt-4 rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Start a new game</button>
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
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
        </div>
            <div className="mt-8">
            <p>Turns: {turns}</p>
            </div>
        </div>
        </div>
      </>
    )
  }
  
export default Home;