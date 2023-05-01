import { createSlice } from '@reduxjs/toolkit';
import { Cards } from '../../types';

const INITIAL_STATE = {
  turns: 0,
  fails: 0,
  cards: [] as Cards,
  choiceOne: null,
  choiceTwo: null,
  disabled: false,
  gameWon: false,
  isModalOpen: false,
  modalMessage: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
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
    setCards: (state, action) => {
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
  setCards,
  setChoiceOne,
  setChoiceTwo,
  setDisabled,
  setGameWon,
  setIsModalOpen,
  setModalMessage,
} = gameSlice.actions;

export default gameSlice.reducer;
