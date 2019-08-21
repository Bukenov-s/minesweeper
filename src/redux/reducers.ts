import * as TYPES from './types';
import { IState, Handler } from '~/types';
import * as actions from '~/redux/actions';
import { createReducer } from '~/utils/createReducer';
import { createTable } from '~/algorithms';

const INITIAL_STATE: IState = {
  game_over: false,
  difficulty: 'unset',
  mines: createTable(9, 9, 9),
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
    9: {},
    10: {},
    11: {},
    12: {},
    13: {},
    14: {},
    15: {},
  },
  timer: {
    is_running: false,
    is_reset: false,
  },
  result: 'unknown'
};

const stopGameHandler: Handler<IState, typeof actions.stopGame> = state => ({
  ...state,
  game_over: true,
});

const startGameHandler: Handler<IState, typeof actions.startGame> = state => ({
  ...state,
  mines: createTable(9, 9, 9),
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
  },
  result: 'unknown'
});

const startEasyGameHandlerHandler: Handler<IState, typeof actions.startEasyGame> = state => ({
  ...state,
  difficulty: 'easy',
  game_over: false,
  mines: createTable(9, 9, 9),
  cells_closed: 9 * 9,
  bombs: 9,
  bombs_counter: 9,
  timer: {
    is_reset: true,
    is_running: false
  },
  result: 'unknown'
});

const startNormalGameHandlerHandler: Handler<IState, typeof actions.startNormalGame> = state => ({
  ...state,
  difficulty: 'normal',
  game_over: false,
  mines: createTable(16, 16, 40),
  cells_closed: 16 * 16,
  bombs: 40,
  bombs_counter: 40,
  timer: {
    is_reset: true,
    is_running: false
  },
  result: 'unknown'
});

const startHardGameHandlerHandler: Handler<IState, typeof actions.startHardGame> = state => ({
  ...state,
  difficulty: 'hard',
  game_over: false,
  mines: createTable(16, 30, 99),
  cells_closed: 16 * 30,
  bombs: 99,
  bombs_counter: 99,
  timer: {
    is_reset: true,
    is_running: false
  },
  result: 'unknown'
});

const setCellOpenHandler: Handler<IState, typeof actions.setCellOpen> = (
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

const startTimerHandler: Handler<IState, typeof actions.startTimer> = state => ({
  ...state,
  timer: {
    is_reset: false,
    is_running: true
  }
});

const stopTimerHandler: Handler<IState, typeof actions.startTimer> = state => ({
  ...state,
  timer: {
    is_reset: false,
    is_running: false
  }
});

const addToFlaggedHandler: Handler<IState, typeof actions.addToFlagged> = (
  state,
  { row, col }
) => {
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

const removeFromFlaggedHandler: Handler<IState, typeof actions.removeFromFlagged> = (
  state,
  { row, col }
) => {
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

const setWinResultHandler: Handler<IState, typeof actions.setWinResult> = state => ({
  ...state,
  result: 'win',
});

const setLossResultHandler: Handler<IState, typeof actions.setLossResult> = state => ({
  ...state,
  result: 'loss',
});

const HANDLERS = {
  [TYPES.STOP_GAME]: stopGameHandler,
  [TYPES.START_GAME]: startGameHandler,
  [TYPES.START_EASY_GAME]: startEasyGameHandlerHandler,
  [TYPES.START_NORMAL_GAME]: startNormalGameHandlerHandler,
  [TYPES.START_HARD_GAME]: startHardGameHandlerHandler,
  [TYPES.SET_CELL_OPEN]: setCellOpenHandler,
  [TYPES.START_TIMER]: startTimerHandler,
  [TYPES.STOP_TIMER]: stopTimerHandler,
  [TYPES.ADD_TO_FLAGGED]: addToFlaggedHandler,
  [TYPES.REMOVE_FROM_FLAGGED]: removeFromFlaggedHandler,
  [TYPES.SET_WIN_RESULT]: setWinResultHandler,
  [TYPES.SET_LOSS_RESULT]: setLossResultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
