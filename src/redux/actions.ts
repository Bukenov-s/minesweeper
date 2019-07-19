import * as TYPES from './types'

export const stopGame = () => ({
  type: TYPES.STOP_GAME,
})

export const startGame = () => ({
  type: TYPES.START_GAME,
})

export const openCell = (id: number, row: number, col: number) => ({
  type: TYPES.OPEN_CELL,
  id,
  row,
  col,
})

export const setCellOpen = (id: number, row: number, col: number) => ({
  type: TYPES.SET_CELL_OPEN,
  id,
  row,
  col,
})

export const toggleAsBomb = (id: number, row: number, col: number) => ({
  type: TYPES.TOGGLE_AS_BOMB,
  id,
  row,
  col,
})
