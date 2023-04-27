import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface GameState {
  turns: number;
  fails: number;
}

const initialState: GameState = {
  turns: 0,
  fails: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementTurns: (state) => {
      state.turns += 1;
    },
    incrementFails: (state) => {
      state.fails += 1;
    },
    resetGame: (state) => {
      state.turns = 0;
      state.fails = 0;
    },
  },
});

export const { incrementTurns, incrementFails, resetGame } = gameSlice.actions;
export const selectTurns = (state: RootState) => state.gameState.turns;
export const selectFails = (state: RootState) => state.gameState.fails;

export default gameSlice.reducer;