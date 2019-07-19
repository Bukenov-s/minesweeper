import { takeLatest, put, select, delay, all, call } from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

//  HOW RECURSION SHOULD HAPPEN
//  1. Start recursion if cell is empty
//  2. 
//
//
//
//
//
//
// - open all eight neighbours if they are not open already
// neighbour is empty?  
// - open all eight neighbours if they are not open already

const getMines = state => state.minesweeper.mines;

function* openCellRecursive(row, col){
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  for(let i = 0; i < this_cell.neighbours.length; i++) {
    const {row, col} = this_cell.neighbours[i];
    const neighbour_cell = mines[row][col];

    // if it's not open already open it now
    if(!neighbour_cell.open){
      yield put(actionCreators.setCellOpen(row, col));  
    }
  }

  for(let i = 0; i < this_cell.neighbours.length; i++) {
    const {row, col} = this_cell.neighbours[i];
    const neighbour_cell = mines[row][col];
    
    if(neighbour_cell.bombs_around === 0){
      yield call(openCellRecursive, row, col);
    } else {
      return null;
    }
  }
  console.log('recursive saga fires');
}

function* openCellSaga({row, col}: ReturnType<typeof actionCreators.openCell>) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];
  
  if(this_cell.has_bomb){
    yield put(actionCreators.stopGame());
    return;
  }

  yield put(actionCreators.setCellOpen(row, col));
  
  if(this_cell.bombs_around === 0){
    yield call(openCellRecursive, row, col);
  }
}

function* flow() {
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
}

export default function* rootSaga() {
  yield flow();
};