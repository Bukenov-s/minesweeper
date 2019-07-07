export interface ICell {
  id: number
  row: number
  col: number
  has_bomb: boolean
  bombs_around: number
  open: boolean
  flagged: boolean
}

export interface IRow {
  [index: string]: ICell
}

export interface Mines {
  [index: string]: IRow
}

export interface IState {
  gameOver: boolean
  mines: any
  bombs: number
}

export type Handler<P, T> = (
  state: P,
  payload: T extends (...args: any[]) => infer R ? R : any,
) => P
