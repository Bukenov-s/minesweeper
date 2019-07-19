import { takeLatest, put, select, delay, all, call } from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;

function* openCellSaga({id, row, col}: ReturnType<typeof actionCreators.openCell>) {
  yield put(actionCreators.setCellOpen(id, row, col))
}

function* flow() {
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
}

export default function* rootSaga() {
  yield flow();
};