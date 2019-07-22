import { takeLatest, put, select, call } from 'redux-saga/effects';
import * as TYPES from './types';
import * as actionCreators from './actions';

const getMines = state => state.minesweeper.mines;

// recursive saga
function* openCellRecursive(row, col) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  yield put(actionCreators.setCellOpen(row, col));

  if (this_cell.neighbours.length) {
    for (let i = 0; i < this_cell.neighbours.length; i++) {
      const { row, col } = this_cell.neighbours[i];
      const neighbour_cell = mines[row][col];
      console.log(neighbour_cell);
      // recursion should happen only if cell is empty
      if (neighbour_cell.bombs_around === 0 && !neighbour_cell.open) {
        //console.log('recursion');
        console.log(row, col);
        yield call(openCellRecursive, row, col);
      } else if (neighbour_cell.bombs_around !== 0 && !neighbour_cell.open) {
        yield put(actionCreators.setCellOpen(row, col));
      } else {
        console.log('no recursion');
      }
    }
  }


  // if(this_cell.bombs_around === 0){
  //   for (let i = 0; i < this_cell.neighbours.length; i++) {
  //     const { row, col } = this_cell.neighbours[i];
  //     const neighbour_cell = mines[row][col];
  //     console.log(neighbour_cell);
  //     // recursion should happen only if cell is empty
  //     if (neighbour_cell.bombs_around === 0 && !neighbour_cell.open) {
  //       //console.log('recursion');
  //       console.log(row, col);
  //       yield call(openCellRecursive, this_cell.neighbours[i].row, this_cell.neighbours[i].col);
  //     } else {
  //       //console.log('no recursion');
  //     }
  //   }
  // }

  // iterate through neighbours of this cell and open them
  // for (let i = 0; i < this_cell.neighbours.length; i++) {
  //   const { row, col } = this_cell.neighbours[i];
  //   const neighbour_cell = mines[row][col];

  //   // if it's not open already open it now
  //   if (!neighbour_cell.open) {
  //     yield put(actionCreators.setCellOpen(row, col));
  //   }
  // }

  // iterate through neighbours again
  // detect empty cells
  // call saga recursively once such a cell is detected
  // for (let i = 0; i < this_cell.neighbours.length; i++) {
  //   const { row, col } = this_cell.neighbours[i];
  //   const neighbour_cell = mines[row][col];
  //   console.log(neighbour_cell);
  //   // recursion should happen only if cell is empty
  //   if (neighbour_cell.bombs_around === 0 && !neighbour_cell.open) {
  //     //console.log('recursion');
  //     console.log(row, col);
  //     yield call(openCellRecursive, this_cell.neighbours[i].row, this_cell.neighbours[i].col);
  //   } else {
  //     //console.log('no recursion');
  //   }
  // }

  console.log('recursive saga ends');
}

function* openCellSaga({ row, col }: ReturnType<typeof actionCreators.openCell>) {
  const mines = yield select(getMines);
  const this_cell = mines[row][col];

  // stop game once app rans into cell with bomb
  // and quit saga as well
  if (this_cell.has_bomb) {
    yield put(actionCreators.stopGame());
    return;
  }

  //yield put(actionCreators.setCellOpen(row, col));
  yield call(openCellRecursive, row, col);
  // start recursion
  // if (this_cell.bombs_around === 0) {
  //   yield call(openCellRecursive, row, col);
  // }
}

function* flow() {
  yield takeLatest(TYPES.OPEN_CELL, openCellSaga);
}

export default function* rootSaga() {
  yield flow();
};