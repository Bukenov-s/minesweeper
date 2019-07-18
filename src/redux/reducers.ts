import * as TYPES from './types'
import { IState, Handler } from '~/types'
import * as actionCreators from '~/redux/actions'
import { createReducer } from 'reduxsauce'
import { createTable } from '~/utils/algorithms'

export const INITIAL_STATE: IState = {
  gameOver: false,
  mines: createTable(9, 9),
  bombs: 9,
}

export const stopGame: Handler<IState, typeof actionCreators.stopGame> = (
  state,
  action,
) => ({
  ...state,
  gameOver: true,
})

export const startGame: Handler<IState, typeof actionCreators.startGame> = (
  state,
  action,
) => ({
  ...state,
  mines: createTable(9, 9),
  gameOver: false,
})

export const openCell: Handler<IState, typeof actionCreators.openCell> = (
  state,
  { id, row, cell },
) => {
  const updatedMines = { ...state.mines }
  updatedMines[row][cell].open = true

  return {
    ...state,
    mines: updatedMines,
  }
}

export const toggleAsBomb: Handler<
  IState,
  typeof actionCreators.toggleAsBomb
> = (state, { id, row, cell }) => {
  const updatedMines = { ...state.mines }
  updatedMines[row][cell].flagged = !updatedMines[row][cell].flagged

  return {
    ...state,
    mines: updatedMines,
  }
}

export const HANDLERS = {
  [TYPES.STOP_GAME]: stopGame,
  [TYPES.START_GAME]: startGame,
  [TYPES.OPEN_CELL]: openCell,
  [TYPES.TOGGLE_AS_BOMB]: toggleAsBomb,
}

export default createReducer<IState, any>(INITIAL_STATE, HANDLERS)
