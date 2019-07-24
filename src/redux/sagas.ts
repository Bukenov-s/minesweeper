import {
  takeLatest,
  put,
  select,
  call,
  delay
} from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;
const getCellsCount = state => state.minesweeper.cells_count;

// recursive saga
function* openCellRecursive(row, col) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  yield put(actionCreators.setCellOpen(row, col));

  yield delay(10);

  if (this_cell.neighbours.length) {
    for (let i = 0; i < this_cell.neighbours.length; i++) {
      const { row: this_row, col: this_col } = this_cell.neighbours[i];
      const neighbour_cell = mines[this_row][this_col];
      // recursion should happen only if cell is empty
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
  const cells_count = yield select(getCellsCount);
  const this_cell = mines[row][col];

  if (cells_count === 81) {
    yield put(actionCreators.startTimer());
  }
  // stop game once app rans into cell with bomb
  // and quit saga as well
  if (this_cell.has_bomb) {
    yield put(actionCreators.stopTimer());
    yield put(actionCreators.stopGame());
    return;
  }

  // recursion starts
  yield call(openCellRecursive, row, col);
}

function* toggleCellSaga({ row, col, has_bomb }: ReturnType<typeof actionCreators.toggleAsBomb>) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  this_cell.flagged
    ? yield put(actionCreators.removeFromDetected(row, col, has_bomb))
    : yield put(actionCreators.addToDetected(row, col, has_bomb));
}

function* flow() {
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
  yield takeLatest(TYPES.TOGGLE_AS_BOMB, toggleCellSaga);
}

export default function* rootSaga() {
  yield flow();
}
