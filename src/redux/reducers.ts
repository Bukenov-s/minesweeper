import * as TYPES from './types';
import { IState, Handler } from '~/types';
import * as actionCreators from '~/redux/actions';
import { createReducer } from 'reduxsauce';
import { createTable } from '~/utils/algorithms';

const INITIAL_STATE: IState = {
  game_over: false,
  difficulty: 'easy',
  mines: createTable(9, 9),
  bombs: 9,
  bombs_counter: 9,
  cells_closed: 81,
  flagged_cells: {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
  },
  timer: {
    is_running: false,
    is_reset: false,
  },
};

const stopGame: Handler<IState, typeof actionCreators.stopGame> = state => ({
  ...state,
  game_over: true,
});

const startGame: Handler<IState, typeof actionCreators.startGame> = state => ({
  ...state,
  mines: createTable(9, 9),
  game_over: false,
  bombs_counter: 9,
  cells_closed: 81,
  flagged_cells: {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
  },
  timer: {
    is_reset: true,
    is_running: false
  }
});

const setCellOpen: Handler<IState, typeof actionCreators.setCellOpen> = (
  state,
  { row, col },
) => {
  const updatedMines = { ...state.mines };
  updatedMines[row][col].open = true;

  return {
    ...state,
    mines: updatedMines,
    cells_closed: state.cells_closed - 1,
  };
};

const startTimer: Handler<IState, typeof actionCreators.startTimer> = state => ({
  ...state,
  timer: {
    is_reset: false,
    is_running: true
  }
});

const stopTimer: Handler<IState, typeof actionCreators.startTimer> = state => ({
  ...state,
  timer: {
    is_reset: false,
    is_running: false
  }
});

const addToFlagged: Handler<IState, typeof actionCreators.addToFlagged> = (state, { row, col }) => {
  const updated_mines = { ...state.mines };
  const updated_flagged_cells = { ...state.flagged_cells };
  updated_mines[row][col].flagged = true;
  updated_flagged_cells[row][col] = { row, col };
  return {
    ...state,
    mines: updated_mines,
    flagged_cells: updated_flagged_cells,
    bombs_counter: state.bombs_counter - 1,
  };
};

const removeFromFlagged: Handler<IState, typeof actionCreators.removeFromFlagged> = (state, { row, col }) => {
  const updated_mines = { ...state.mines };
  const updated_flagged_cells = { ...state.flagged_cells };
  updated_mines[row][col].flagged = false;
  delete updated_flagged_cells[row][col];
  return {
    ...state,
    mines: updated_mines,
    flagged_cells: updated_flagged_cells,
    bombs_counter: state.bombs_counter + 1,
  };
};

const HANDLERS = {
  [TYPES.STOP_GAME]: stopGame,
  [TYPES.START_GAME]: startGame,
  [TYPES.SET_CELL_OPEN]: setCellOpen,
  [TYPES.START_TIMER]: startTimer,
  [TYPES.STOP_TIMER]: stopTimer,
  // [TYPES.TOGGLE_AS_BOMB]: toggleAsBomb,
  [TYPES.ADD_TO_FLAGGED]: addToFlagged,
  [TYPES.REMOVE_FROM_FLAGGED]: removeFromFlagged,
};

export default createReducer<IState, any>(INITIAL_STATE, HANDLERS);
