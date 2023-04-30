import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Button from '../components/Button';
import Title from '../components/Title';

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
    <Layout>
      <img className='w-full h-64' src={pokemonData.sprites.front_default} alt={pokemonData.name} />

      <Title text={pokemonData.name} />
        <p className='text-gray-600'>Height: {pokemonData.heitght}</p>
        <p className='text-gray-600'>Weight: {pokemonData.weight}</p>
        <p className='text-gray-600'>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>

        <Link to='/'>
          <Button>Start a new game</Button>
        </Link>
    </Layout>
  );
};

export default PokemonDetails;
