import { takeLatest, put, select, delay, all, call } from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;

function* openCellSaga({row, col}: ReturnType<typeof actionCreators.openCell>) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];
  
  if(this_cell.has_bomb){
    yield put(actionCreators.stopGame());
    return;
  }

  yield put(actionCreators.setCellOpen(row, col))
  
  if(this_cell.bombs_around === 0){
    // if cell is empty 
    // open all of her neighbours
    //
    //
    //
    //
    //
    //
    //
  }
  console.log(mines);
}

function* flow() {
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
}

export default function* rootSaga() {
  yield flow();
};