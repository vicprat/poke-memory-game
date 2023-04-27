import { combineReducers } from '@reduxjs/toolkit';
import gameState from './gameSlice';

const rootReducer = combineReducers({
  gameState
});

export default rootReducer;
