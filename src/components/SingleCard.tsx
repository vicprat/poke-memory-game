// // import pokeball from '../assets/pokeball.png'

// // type CardItem = {
// //   src: string;
// //   name: string;
// //   id: number;
// //     matched: boolean;
// // };

// // type SingleCardProps = {
// //   card: CardItem;
// //   handleChoice: (card: CardItem) => void;
// //   flipped: boolean;
// //   disabled: boolean;
// // };

// // const SingleCard = ({ card, handleChoice, flipped, disabled}: SingleCardProps) => {
// //   const handleClick = () => {
// //     if(!disabled) {
// //         handleChoice(card)
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-md shadow-md relative">
// //       <img
// //         src={card.src}
// //         alt={card.name}
// //         className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 transition-opacity ${
// //           flipped ? "opacity-0" : "opacity-100"
// //         }`}
// //       />
// //       <img
// //         onClick={handleClick}
// //         src={pokeball}
// //         alt="pokeball"
// //         className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 absolute inset-0 ${
// //           flipped ? "opacity-100" : "opacity-0"
// //         } transition-opacity`}
// //       />
// //     </div>
// //   );
// // };

// // export default SingleCard;
// import { Link } from 'react-router-dom';
// import pokeball from '../assets/pokeball.png'

// type CardItem = {
//     src: string;
//     name: string;
//     id: number;
//     matched: boolean;
// };

// type SingleCardProps = {
//     card: CardItem;
//     handleChoice: (card: CardItem) => void;
//     flipped: boolean;
//     disabled: boolean;
//     onWin?: (pokemonId: number) => void;
// };

// const SingleCard = ({ card, handleChoice, flipped, disabled }: SingleCardProps) => {
//     // ...


//     const handleClick = () => {
//         if (!disabled) {
//             handleChoice(card)
//         }
//     };

//     // const handleCardClick = () => {
//     //     navigate(`/pokemon/${card.id}`)
//     // }

//     return (
//         <div className="bg-white rounded-md shadow-md relative">
//       {flipped ? (
//         <Link to={`/pokemon/${card.id}`}>
//           <img
//             src={card.src}
//             alt={card.name}
//             className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 ${
//               flipped ? 'opacity-0' : 'opacity-100'
//             } transition-opacity`}
//           />
//         </Link> 
//       ) : (
//         <img
//           onClick={handleClick}
//           src={card.src}
//           alt={card.name}
//           className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 ${
//             flipped ? 'opacity-0' : 'opacity-100'
//           } transition-opacity`}
//         />
//       )}
//       <img
//         onClick={handleClick}
//         src={pokeball}
//         alt="pokeball"
//         className={`w-full h-32 rounded-t-md border-2 border-indigo-500/50 absolute inset-0 ${
//           flipped ? 'opacity-100' : 'opacity-0'
//         } transition-opacity`}
//       />
//     </div>
//     );
// };

// export default SingleCard;
import React from 'react';

type CardProps = {
  card: {
    id: number;
    src: string;
    name: string;
    matched: boolean;
    onWin?: (pokemonId: number) => void;
  };
  handleChoice: (card: any) => void;
  flipped: boolean;
  disabled: boolean;
};

const SingleCard: React.FC<CardProps> = ({
  card,
  handleChoice,
  flipped,
  disabled,
  onWin,
}) => {
  const handleClick = () => {
    if (!flipped && !disabled) {
      handleChoice(card);
    } else if (flipped && card.matched && onWin) {
      onWin(card.id); // Call the onWin function when the user clicks on a matched card
    }
  };

  return (
    <div
      className={`w-20 h-28 bg-blue-500 bg-opacity-20 rounded-md shadow-md cursor-pointer ${
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
