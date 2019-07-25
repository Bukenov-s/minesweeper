import { generateID } from '~/utils/generateID';
// 1. generate object of row objects of cell objects
// 2. generate random indexes to assign bombs to cells
// 3. count bombs

// generates objects of objects
// with indexes as keys and objects as values
export const createTable = (rows, cols) => {
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

  // generate random indexes to assign bombs later on
  const pickRandomUniqueIndexes = () => {
    // generates an array of all possible indexes of cells
    // for example '00' - means first row and first cell , '25' - means third row sixth cell
    const allPossibleIndexes = (function () {
      const arr = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          arr.push(i + '' + j);
        }
      }
      return arr;
    })();
    const arr = [];
    while (arr.length < 9) {
      const randomNumber = Math.floor(Math.random() * 81);
      const randomIndex = allPossibleIndexes[randomNumber];
      if (arr.indexOf(randomIndex) > -1) continue;
      arr.push(randomIndex);
    }
    return arr;
  };
  // assigning bombs to cells and also counting bombs happens here
  pickRandomUniqueIndexes().forEach(
    (num) => {
      const [row, col] = num.split('').map(str => +str);
      switch (col) {
        case 0:
          if (row === 0) {
            mines[row][col + 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col + 1].bombs_around++;
          } else if (row === 8) {
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
        case 8:
          if (row === 0) {
            mines[row][col - 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col - 1].bombs_around++;
          } else if (row === 8) {
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
          if (row === 0) {
            mines[row][col - 1].bombs_around++;
            mines[row][col + 1].bombs_around++;
            mines[row + 1][col].bombs_around++;
            mines[row + 1][col - 1].bombs_around++;
            mines[row + 1][col + 1].bombs_around++;
          } else if (row === 8) {
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
          case 0:
            if (cell.row === 0) {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col + 1].coordinates,
              );
            } else if (cell.row === 8) {
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
          case 8:
            if (cell.row === 0) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col - 1].coordinates,
              );
            } else if (cell.row === 8) {
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
            if (cell.row === 0) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].coordinates,
                mines[cell.row][cell.col + 1].coordinates,
                mines[cell.row + 1][cell.col].coordinates,
                mines[cell.row + 1][cell.col - 1].coordinates,
                mines[cell.row + 1][cell.col + 1].coordinates,
              );
            } else if (cell.row === 8) {
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
