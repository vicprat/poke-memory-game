import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../pages/Home';

type CardProps = {
  card: {
    id: number;
    src: string;
    name: string;
    matched: boolean;
    pokemonId: number;
  };
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
  gameWon: boolean;
};

const SingleCard: React.FC<CardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
  gameWon,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!flipped && !disabled) {
      handleChoice(card);
    } else if (flipped && card.matched && gameWon) {
      navigate(`/pokemon/${card.pokemonId}`);
    }
  };

  return (
    <div
      className={`w-20 h-28 bg-blue-500 bg-opacity-20  rounded-md shadow-md cursor-pointer ${
        flipped ? 'bg-opacity-20' : ''
      }`}
      onClick={handleClick}
    >
      {flipped && (
        <img
          src={card.src}
          alt={card.name}
          className="w-full h-full object-cover rounded-md"
        />
      )}
    </div>
  );
};

export default SingleCard;
