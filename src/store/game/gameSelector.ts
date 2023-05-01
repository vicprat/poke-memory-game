import { RootState } from '../store';

export const selectTurns = (state: RootState) => state.game.turns;
export const selectFails = (state: RootState) => state.game.fails;
export const selectCards = (state: RootState) => state.game.cards;
export const selectChoiceOne = (state: RootState) => state.game.choiceOne;
export const selectChoiceTwo = (state: RootState) => state.game.choiceTwo;
export const selectDisabled = (state: RootState) => state.game.disabled;
export const selectGameWon = (state: RootState) => state.game.gameWon;
export const selectIsModalOpen = (state: RootState) => state.game.isModalOpen;
export const selectModalMessage = (state: RootState) => state.game.modalMessage;

