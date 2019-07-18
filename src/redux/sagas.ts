import { takeLatest, put, select, delay, all, call } from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;

function* flow() {
  // no flow yet
}

export default function* rootSaga() {
  yield flow();
};