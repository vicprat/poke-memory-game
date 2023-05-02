import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../../types';

const INITIAL_STATE = {
  gameStarted: false,
  turns: 0,
  fails: 0,
  cards: [] as Card[],
  choiceOne: null as Card | null,
  choiceTwo: null as Card | null,
  disabled: false,
  gameWon: false,
  isModalOpen: false,
  modalMessage: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setGameStarted: (state) => {
      state.gameStarted = true;
    },
    incrementTurns: (state) => {
      state.turns += 1;
    },
    incrementFails: (state) => {
      state.fails += 1;
    },
    resetGame: (state) => {
      state.turns = 0;
      state.fails = 0;
      state.cards = [];
    },
    updateCards: (state, action) => {
      state.cards = action.payload;
    },
    setChoiceOne: (state, action) => {
      state.choiceOne = action.payload;
    },
    setChoiceTwo: (state, action) => {
      state.choiceTwo = action.payload;
    },
    setDisabled: (state, action) => {
      state.disabled = action.payload;
    },
    setGameWon: (state, action) => {
      state.gameWon = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setModalMessage: (state, action) => {
      state.modalMessage = action.payload;
    },
  },
});

export const {
  incrementTurns,
  incrementFails,
  resetGame,
  updateCards,
  setChoiceOne,
  setChoiceTwo,
  setDisabled,
  setGameWon,
  setIsModalOpen,
  setModalMessage,
  setGameStarted
} = gameSlice.actions;

export default gameSlice.reducer;
