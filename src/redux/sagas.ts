import {
  takeLatest,
  put,
  select,
  call,
  delay
} from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

// Selectors
const getMines = state => state.minesweeper.mines;
const getCellsClosed = state => state.minesweeper.cells_closed;
const getBombs = state => state.minesweeper.bombs;

function* resetGameSaga({ difficulty }: ReturnType<typeof actionCreators.resetGame>) {
  // do stuff
  if (difficulty === 'easy') {
    return yield put(actionCreators.startEasyGame());
  }

  if (difficulty === 'normal') {
    return yield put(actionCreators.startNormalGame());
  }

  if (difficulty === 'hard') {
    return yield put(actionCreators.startHardGame());
  }
}

// recursive saga
function* openCellRecursive(row: number, col: number) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  yield put(actionCreators.setCellOpen(row, col));

  yield delay(10);

  if (this_cell.neighbours.length) {
    for (let i = 0; i < this_cell.neighbours.length; i++) {
      const { row: this_row, col: this_col } = this_cell.neighbours[i];
      const neighbour_cell = mines[this_row][this_col];

      if (neighbour_cell.bombs_around === 0 && !neighbour_cell.open) {
        yield call(openCellRecursive, this_row, this_col);
      } else if (neighbour_cell.bombs_around !== 0 && !neighbour_cell.open) {
        yield put(actionCreators.setCellOpen(this_row, this_col));
      } else {
        console.log('no recursion');
      }
    }
  }
  console.log('recursive saga ends');
}

function* openCellSaga({ row, col }: ReturnType<typeof actionCreators.openCell>) {
  const mines = yield select(getMines);
  const cells_closed = yield select(getCellsClosed);
  const bombs = yield select(getBombs);
  const this_cell = mines[row][col];

  if (cells_closed === 81) {
    yield put(actionCreators.startTimer());
  }
  // stop game once app rans into cell with bomb
  // and quit saga as well
  if (this_cell.has_bomb) {
    yield put(actionCreators.stopTimer());
    yield put(actionCreators.stopGame());
    yield put(actionCreators.setLossResult());
    return;
  }

  // recursion starts
  yield call(openCellRecursive, row, col);

  if (cells_closed === bombs + 1) {
    yield put(actionCreators.stopTimer());
    yield put(actionCreators.stopGame());
    yield put(actionCreators.setWinResult());
  }
}

function* toggleAsBombSaga({ row, col }: ReturnType<typeof actionCreators.toggleAsBomb>) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];
  /* eslint-disable */
  this_cell.flagged
    ? yield put(actionCreators.removeFromFlagged(row, col))
    : yield put(actionCreators.addToFlagged(row, col))
  /* eslint-enable */
}

function* flow() {
  yield takeLatest(TYPES.RESET_GAME, resetGameSaga);
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
  yield takeLatest(TYPES.TOGGLE_AS_BOMB, toggleAsBombSaga);
}

export default function* rootSaga() {
  yield flow();
}
