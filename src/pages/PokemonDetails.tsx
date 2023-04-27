import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type PokemonDetailsParams = {
  id: string;
};
interface Pokemon {
    name: string;
    sprites: {
      front_default: string;
    };
    heitght: number;
    weight: number;
    types: {
        type: {
            name: string;
        }
    }[];
  }

const PokemonDetails = () => {
  const { id } = useParams<PokemonDetailsParams>();
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null)

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [id]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
     <div className='block text-center'>
      <img className='w-full h-64' src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <h1 className='text-2xl font-semibold text-gray-600 capitalize'>{pokemonData.name}</h1>
        <p className='text-gray-600'>Height: {pokemonData.heitght}</p>
        <p className='text-gray-600'>Weight: {pokemonData.weight}</p>
        <p className='text-gray-600'>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
        <Link to='/'>
        <button className="mt-4 rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Start a new game</button>
        </Link>
     </div>
    </div>
  );
};

export default PokemonDetails;
