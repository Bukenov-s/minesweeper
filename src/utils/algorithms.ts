// 1. generate object of row objects of cell objects
// 2. generate random indexes to assign bombs to cells
// 3. count bombs

// randomly picks 9 items from allPossibleIndexes array of strings


// generates objects of objects
// with indexes as keys and objects as values
export const createTable = () => {
  const mines = {}
  for (let i = 0; i < 9; i++) {
    mines[i] = {}
    for (let j = 0; j < 9; j++) {
      mines[i][j] = {}
      mines[i][j] = {
        id: i.toString() + j.toString(),
        row: i,
        col: j,
        has_bomb: false,
        bombs_around: 0,
        open: false,
        flagged: false,
        neighbours: [],
      }
    }
  }


  const pickRandomUniqueIndexes = () => {
    // generates an array of all possible indexes of cells 
    // for example '00' - means first row and first cell , '25' - means third row sixth cell
    const allPossibleIndexes = (function () {
      const arr = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
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
      allPossibleIndexes.splice
    };
    return arr;
  }
  ////////////////
  pickRandomUniqueIndexes().forEach(
    num => {
      const [row, col] = num.split('').map(str => Number(str));
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
      console.log('accessing cell', mines[row][col])
    },
  )
  ////////////////

  Object.keys(mines) // returns [0,1,2,3,4,5,6,7,8]
    .map(arr =>
      Object.values(
        mines[arr], // returns array of objects
      ).map((cell: any) => {
        if (cell.bombs_around !== 0) {
          return;
        }
        switch (cell.col) {
          case 0:
            if (cell.row === 0) {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].id,
                mines[cell.row + 1][cell.col].id,
                mines[cell.row + 1][cell.col + 1].id,
              );
            } else if (cell.row === 8) {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].id,
                mines[cell.row - 1][cell.col].id,
                mines[cell.row - 1][cell.col + 1].id,
              )

            } else {
              cell.neighbours.push(
                mines[cell.row][cell.col + 1].id,
                mines[cell.row - 1][cell.col].id,
                mines[cell.row - 1][cell.col + 1].id,
                mines[cell.row + 1][cell.col].id,
                mines[cell.row + 1][cell.col + 1].id,
              )

            }
            break;
          case 8:
            if (cell.row === 0) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].id,
                mines[cell.row + 1][cell.col].id,
                mines[cell.row + 1][cell.col - 1].id,
              );

            } else if (cell.row === 8) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].id,
                mines[cell.row - 1][cell.col].id,
                mines[cell.row - 1][cell.col - 1].id,
              )

            } else {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].id,
                mines[cell.row - 1][cell.col].id,
                mines[cell.row - 1][cell.col - 1].id,
                mines[cell.row + 1][cell.col].id,
                mines[cell.row + 1][cell.col - 1].id,
              )

            }
            break;
          default:
            if (cell.row === 0) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].id,
                mines[cell.row][cell.col + 1].id,
                mines[cell.row + 1][cell.col].id,
                mines[cell.row + 1][cell.col - 1].id,
                mines[cell.row + 1][cell.col + 1].id,
              )

            } else if (cell.row === 8) {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].id,
                mines[cell.row][cell.col + 1].id,
                mines[cell.row - 1][cell.col].id,
                mines[cell.row - 1][cell.col - 1].id,
                mines[cell.row - 1][cell.col + 1].id,
              )

            } else {
              cell.neighbours.push(
                mines[cell.row][cell.col - 1].id,
                mines[cell.row][cell.col + 1].id,
                mines[cell.row - 1][cell.col].id,
                mines[cell.row - 1][cell.col - 1].id,
                mines[cell.row - 1][cell.col + 1].id,
                mines[cell.row + 1][cell.col].id,
                mines[cell.row + 1][cell.col - 1].id,
                mines[cell.row + 1][cell.col + 1].id,
              )

            }
        }
      }),
    )

  //////////////

  return mines
}

export const table = createTable()
