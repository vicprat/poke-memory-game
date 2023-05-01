import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { PokemonDetailsParams } from '../types';
import { RootState } from '../store/store';
import { fetchPokemonData } from '../store/pokemonSlice';

import Layout from '../layout/Layout';
import Button from '../components/Button';
import Title from '../components/Title';
import LoadingSpinner from '../components/LoadingSpinner';

const PokemonDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams<PokemonDetailsParams>();
  const pokemonData = useSelector((state: RootState) => state.pokemon.data);
  const status = useSelector((state: RootState) => state.pokemon.status);
  const error = useSelector((state: RootState) => state.pokemon.error);

  useEffect(() => {
    dispatch(fetchPokemonData(id));
  }, [id, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <Layout><Title text={`Error: ${error}`}/></Layout>;
  }

  if (!pokemonData) {
    return null;
  }

  return (
    <Layout>
      <img className='w-full h-64' src={pokemonData.sprites.front_default} alt={pokemonData.name} />

      <Title text={pokemonData.name} />
        <p className='text-gray-600'>Height: {pokemonData.height}</p>
        <p className='text-gray-600'>Weight: {pokemonData.weight}</p>
        <p className='text-gray-600'>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>

        <Link to='/'>
          <Button>Start a new game</Button>
        </Link>
    </Layout>
  );
};

export default PokemonDetails;
