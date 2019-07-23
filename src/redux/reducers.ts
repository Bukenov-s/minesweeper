import * as TYPES from './types'
import { IState, Handler } from '~/types'
import * as actionCreators from '~/redux/actions'
import { createReducer } from 'reduxsauce'
import { createTable } from '~/utils/algorithms'

const INITIAL_STATE: IState = {
  game_over: false,
  mines: createTable(9, 9),
  bombs: 9,
  cells_count: 81,
  have_bombs: [],
  timer: false,
}

const stopGame: Handler<IState, typeof actionCreators.stopGame> = (
  state,
  action,
) => ({
  ...state,
  game_over: true,
})

const startGame: Handler<IState, typeof actionCreators.startGame> = (
  state,
  action,
) => ({
  ...state,
  mines: createTable(9, 9),
  game_over: false,
})

const setCellOpen: Handler<IState, typeof actionCreators.setCellOpen> = (
  state,
  { row, col },
) => {
  const updatedMines = { ...state.mines }
  updatedMines[row][col].open = true

  return {
    ...state,
    mines: updatedMines,
    cells_count: --state.cells_count,
  }
}

const toggleAsBomb: Handler<
  IState,
  typeof actionCreators.toggleAsBomb
> = (state, { row, col }) => {
  const updatedMines = { ...state.mines }
  updatedMines[row][col].flagged = !updatedMines[row][col].flagged

  return {
    ...state,
    mines: updatedMines,
  }
}

const HANDLERS = {
  [TYPES.STOP_GAME]: stopGame,
  [TYPES.START_GAME]: startGame,
  [TYPES.SET_CELL_OPEN]: setCellOpen,
  [TYPES.TOGGLE_AS_BOMB]: toggleAsBomb,
}

export default createReducer<IState, any>(INITIAL_STATE, HANDLERS)
