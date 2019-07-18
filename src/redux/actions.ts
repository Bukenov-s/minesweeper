import * as TYPES from './types'

export const stopGame = () => ({
  type: TYPES.STOP_GAME,
})

export const startGame = () => ({
  type: TYPES.START_GAME,
})

export const openCell = (id: number, row: number, cell: number) => ({
  type: TYPES.OPEN_CELL,
  id,
  row,
  cell,
})

export const toggleAsBomb = (id: number, row: number, cell: number) => ({
  type: TYPES.TOGGLE_AS_BOMB,
  id,
  row,
  cell,
})
