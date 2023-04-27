// import pokeball from '../assets/pokeball.png'

// type CardItem = {
//   src: string;
//   name: string;
//   id: number;
//     matched: boolean;
// };

// type SingleCardProps = {
//   card: CardItem;
//   handleChoice: (card: CardItem) => void;
//   flipped: boolean;
//   disabled: boolean;
// };

// const SingleCard = ({ card, handleChoice, flipped, disabled}: SingleCardProps) => {
//   const handleClick = () => {
//     if(!disabled) {
//         handleChoice(card)
//     }
//   };

//   return (
//     <div className="bg-white rounded-md shadow-md relative">
//       <img
//         src={card.src}
//         alt={card.name}
//         className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 transition-opacity ${
//           flipped ? "opacity-0" : "opacity-100"
//         }`}
//       />
//       <img
//         onClick={handleClick}
//         src={pokeball}
//         alt="pokeball"
//         className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 absolute inset-0 ${
//           flipped ? "opacity-100" : "opacity-0"
//         } transition-opacity`}
//       />
//     </div>
//   );
// };

// export default SingleCard;
import { useNavigate } from 'react-router-dom';
import pokeball from '../assets/pokeball.png'

type CardItem = {
    src: string;
    name: string;
    id: number;
    matched: boolean;
};

type SingleCardProps = {
    card: CardItem;
    handleChoice: (card: CardItem) => void;
    flipped: boolean;
    disabled: boolean;
};

const SingleCard = ({ card, handleChoice, flipped, disabled }: SingleCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    };

    const handleCardClick = () => {
        navigate(`/pokemon/${card.id}`)
    }

    return (
        <div className="bg-white rounded-md shadow-md relative">
            <img
                onClick={handleCardClick}
                src={card.src}
                alt={card.name}
                className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 transition-opacity ${
                    flipped ? "opacity-0" : "opacity-100"
                }`}
            />
            <img
                onClick={handleClick}
                src={pokeball}
                alt="pokeball"
                className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 absolute inset-0 ${
                    flipped ? "opacity-100" : "opacity-0"
                } transition-opacity`}
            />
        </div>
    );
};

export default SingleCard;
