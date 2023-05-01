import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from '../layout/Layout';
import Button from '../components/Button';
import Title from '../components/Title';
import LoadingSpinner from '../components/LoadingSpinner';

import { Pokemon, PokemonDetailsParams } from '../types';
import { useFetch } from '../hooks/useFetch';

import { setGameWon } from '../store/game/gameSlice';

const PokemonDetails = () => {
  const dispatch = useDispatch();
  
  const { id } = useParams<PokemonDetailsParams>();
  const { data: pokemonData, loading, error } = useFetch<Pokemon | null>(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return (
      <Layout>
        <p>Error fetching Pokémon data: {error.message}</p>
        <Link to='/'>
          <Button>Start a new game</Button>
        </Link>
      </Layout>
    );
  }

  if (!pokemonData) {
    return null;
  }

  const handleClickWon = () => {
    dispatch(setGameWon(false));
  };

  return (
    <Layout>
      <img className='w-full h-64' src={pokemonData.sprites.front_default} alt={pokemonData.name} />

      <Title text={pokemonData.name} />
      <p className='text-gray-600'>Height: {pokemonData.height}</p>
      <p className='text-gray-600'>Weight: {pokemonData.weight}</p>
      <p className='text-gray-600'>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>

      <Link to='/'>
        <Button onClick={handleClickWon}>Start a new game</Button>
      </Link>
    </Layout>
  );
};

export default PokemonDetails;
