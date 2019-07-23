export interface ICell {
  id: number
  row: number
  col: number
  has_bomb: boolean
  bombs_around: number
  open: boolean
  flagged: boolean
  neighbours: any[]
}

export interface IRow {
  [index: string]: ICell
}

export interface Mines {
  [index: string]: IRow
}

export interface IState {
  game_over: boolean;
  mines: any;
  bombs: number;
  cells_count: number;
  have_bombs: any[];
  timer: {
    is_running: boolean;
    is_reset: boolean;
  };
}

export type Handler<P, T> = (
  state: P,
  payload: T extends (...args: any[]) => infer R ? R : any,
) => P
