import { takeLatest, put, select, delay, all, call } from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;

function* openNeighboursSaga(ids) {
  const mines = yield select(getMines);
  console.log(mines);


}

function* openManyCellsSaga(action) {

  yield put(actionCreators.setManyCellsOpen(action.ids))
  //yield openNeighboursSaga(action.ids);
  //yield put(actionCreators.setManyCellsOpen(action.ids[0].neighbours));
  for (let i = 0; i < action.ids.length; i++) {
    yield put(actionCreators.openCell(action.ids[i], +action.ids[i][0], +action.ids[i][1]));
  }
}

function* flow() {
  yield takeLatest(TYPES.OPEN_MANY_CELLS, openManyCellsSaga);
}

export default function* rootSaga() {
  yield flow();
};