import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './game/gameSlice';
import pokemonReducer from './pokemonSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  pokemon: pokemonReducer
});

export default rootReducer;
