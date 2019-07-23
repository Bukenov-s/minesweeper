import * as TYPES from './types';

export const stopGame = () => ({
  type: TYPES.STOP_GAME,
});

export const startGame = () => ({
  type: TYPES.START_GAME,
});

export const openCell = (row: number, col: number) => ({
  type: TYPES.OPEN_CELL,
  row,
  col,
});

export const setCellOpen = (row: number, col: number) => ({
  type: TYPES.SET_CELL_OPEN,
  row,
  col,
});

export const toggleAsBomb = (row: number, col: number) => ({
  type: TYPES.TOGGLE_AS_BOMB,
  row,
  col,
});

export const startTimer = () => ({
  type: TYPES.START_TIMER,
});

export const stopTimer = () => ({
  type: TYPES.STOP_TIMER,
});