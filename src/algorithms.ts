import { generateID } from '~/utils/generateID';
// 1. generate object of row objects of cell objects
// 2. generate random indexes to assign bombs to cells
// 3. count bombs

const setCellPosition = (row: number, col: number) => {
  let position = '';
  if (col === 0) {
    position = 'leftmost';
  }
  if (col === 8) {
    position = 'rightmost';
  }
  if (row === 0) {
    position = 'uppermost';
  }
  if (row === 8) {
    position = 'lowermost';
  }
  if (row === 0 && col === 0) {
    position = 'uppermost leftmost';
  }
  if (row === 0 && col === 8) {
    position = 'uppermost rightmost';
  }
  if (row === 8 && col === 0) {
    position = 'lowermost leftmost';
  }
  if (row === 8 && col === 8) {
    position = 'lowermost rightmost';
  }
  if ((row !== 0 && row !== 8) && (col !== 0 && col !== 8)) {
    position = 'center';
  }
  return position;
};

const pickRandomUniqueIndexes = (rows: number, cols: number, bombs: number) => {
  // generates an array of all possible indexes of cells
  // for example '00' - means first row and first cell , '25' - means third row sixth cell

  /* eslint-disable */
  const indexes = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      indexes.push(i + ' ' + j);
    }
  }
  /* eslint-enable */

  const random_indexes = [];
  while (random_indexes.length < bombs) {
    const randomNumber = Math.floor(Math.random() * (rows * cols));
    const randomIndex = indexes[randomNumber];
    if (random_indexes.indexOf(randomIndex) > -1) continue;
    random_indexes.push(randomIndex);
  }

  return random_indexes;
};

// generates objects of objects
// with indexes as keys and objects as values
export const createTable = (rows: number, cols: number, bombs: number) => {
  // generate initial empty table
  const mines = {};
  for (let i = 0; i < rows; i++) {
    mines[i] = {};
    for (let j = 0; j < cols; j++) {
      mines[i][j] = {};
      mines[i][j] = {
        id: generateID(i, j),
        row: i,
        col: j,
        position: setCellPosition(i, j),
        coordinates: { row: i, col: j },
        has_bomb: false,
        bombs_around: 0,
        empty: true,
        open: false,
        flagged: false,
        neighbours: [],
      };
    }
  }

  // assigning bombs to cells and also counting bombs happens here
  pickRandomUniqueIndexes(rows, cols, bombs).forEach(
    (num) => {
      const [row, col] = num.split(' ').map(str => +str);
      switch (col) {
        case (cols - cols):
          if (row === (rows - rows)) {
            mines[row][col + 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col + 1].bombs_around++;
          } else if (row === (rows - 1)) {
            mines[row][col + 1].bombs_around++;
            mines[row - 1][col].bombs_around++;
            mines[row - 1][col + 1].bombs_around++;
          } else {
            mines[row][col + 1].bombs_around++;
            mines[row - 1][col].bombs_around++;
            mines[row - 1][col + 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col + 1].bombs_around++;
          }
          break;
        case (cols - 1):
          if (row === (rows - rows)) {
            mines[row][col - 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col - 1].bombs_around++;
          } else if (row === (rows - 1)) {
            mines[row][col - 1].bombs_around++;
            mines[row - 1][col].bombs_around++;
            mines[row - 1][col - 1].bombs_around++;
          } else {
            mines[row][col - 1].bombs_around++;
            mines[row - 1][col].bombs_around++;
            mines[row - 1][col - 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col - 1].bombs_around++;
          }
          break;
        default:
          if (row === (rows - rows)) {
            mines[row][col - 1].bombs_around++;
            mines[row][col + 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col - 1].bombs_around++;
            mines[row + 1][col + 1].bombs_around++;
          } else if (row === (rows - 1)) {
            mines[row][col - 1].bombs_around++;
            mines[row][col + 1].bombs_around++;
            mines[row - 1][col].bombs_around++;
            mines[row - 1][col - 1].bombs_around++;
            mines[row - 1][col + 1].bombs_around++;
          } else {
            mines[row][col - 1].bombs_around++;
            mines[row][col + 1].bombs_around++;
            mines[row - 1][col].bombs_around++;
            mines[row - 1][col - 1].bombs_around++;
            mines[row - 1][col + 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col - 1].bombs_around++;
            mines[row + 1][col + 1].bombs_around++;
          }
      }
      mines[row][col].has_bomb = true;
      mines[row][col].empty = false;
    },
  );

  // recognize empty cells and give them access to their neighbours
  Object.keys(mines)
    .map(arr => Object.values(mines[arr])
      .map((cell: any) => {
        if (cell.bombs_around !== 0) {
          return;
        }
        switch (cell.col) {
          case (cols - cols):
            if (cell.row === (rows - rows)) {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col + 1].coordinates,
              );
            } else if (cell.row === (rows - 1)) {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row - 1][cell.col].coordinates,
                mines[cell.row - 1][cell.col + 1].coordinates,
              );
            } else {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row - 1][cell.col].coordinates,
                mines[cell.row - 1][cell.col + 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col + 1].coordinates,
              );
            }
            break;
          case (cols - 1):
            if (cell.row === (rows - rows)) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col - 1].coordinates,
              );
            } else if (cell.row === (rows - 1)) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row - 1][cell.col].coordinates,
                mines[cell.row - 1][cell.col - 1].coordinates,
              );
            } else {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row - 1][cell.col].coordinates,
                mines[cell.row - 1][cell.col - 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col - 1].coordinates,
              );
            }
            break;
          default:
            if (cell.row === (rows - rows)) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col - 1].coordinates,
                mines[cell.row + 1][cell.col + 1].coordinates,
              );
            } else if (cell.row === (rows - 1)) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row - 1][cell.col].coordinates,
                mines[cell.row - 1][cell.col - 1].coordinates,
                mines[cell.row - 1][cell.col + 1].coordinates,
              );
            } else {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row - 1][cell.col].coordinates,
                mines[cell.row - 1][cell.col - 1].coordinates,
                mines[cell.row - 1][cell.col + 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col - 1].coordinates,
                mines[cell.row + 1][cell.col + 1].coordinates,
              );
            }
        }
      }));

  return mines;
};
