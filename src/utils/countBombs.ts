export function countBombs(table) {
  let cellsAround

  let newtable = table.map((row, rowIndex) => {
    row.map((cell, cellIndex) => {
      // assigning tableay
      switch (cellIndex) {
        case 0:
          if (rowIndex === 0) {
            cellsAround = [
              table[rowIndex][cellIndex + 1].hasBomb,
              table[rowIndex + 1][cellIndex + 1].hasBomb,
              table[rowIndex + 1][cellIndex].hasBomb,
            ]
          } else if (rowIndex === 8) {
            cellsAround = [
              table[rowIndex][cellIndex + 1].hasBomb,
              table[rowIndex - 1][cellIndex + 1].hasBomb,
              table[rowIndex - 1][cellIndex].hasBomb,
            ]
          } else {
            cellsAround = [
              table[rowIndex][cellIndex + 1].hasBomb,
              table[rowIndex - 1][cellIndex + 1].hasBomb,
              table[rowIndex - 1][cellIndex].hasBomb,
              table[rowIndex + 1][cellIndex + 1].hasBomb,
              table[rowIndex + 1][cellIndex].hasBomb,
            ]
          }

          break
        case 8:
          if (rowIndex === 0) {
            cellsAround = [
              table[rowIndex][cellIndex - 1].hasBomb,
              table[rowIndex + 1][cellIndex - 1].hasBomb,
              table[rowIndex + 1][cellIndex].hasBomb,
            ]
          } else if (rowIndex === 8) {
            cellsAround = [
              table[rowIndex][cellIndex - 1].hasBomb,
              table[rowIndex - 1][cellIndex - 1].hasBomb,
              table[rowIndex - 1][cellIndex].hasBomb,
            ]
          } else {
            cellsAround = [
              table[rowIndex][cellIndex - 1].hasBomb,
              table[rowIndex - 1][cellIndex - 1].hasBomb,
              table[rowIndex - 1][cellIndex].hasBomb,
              table[rowIndex + 1][cellIndex - 1].hasBomb,
              table[rowIndex + 1][cellIndex].hasBomb,
            ]
          }
          break
        default:
          if (rowIndex === 0) {
            cellsAround = [
              table[rowIndex][cellIndex + 1].hasBomb,
              table[rowIndex][cellIndex - 1].hasBomb,
              table[rowIndex + 1][cellIndex + 1].hasBomb,
              table[rowIndex + 1][cellIndex].hasBomb,
              table[rowIndex + 1][cellIndex - 1].hasBomb,
            ]
          } else if (rowIndex === 8) {
            cellsAround = [
              table[rowIndex][cellIndex + 1].hasBomb,
              table[rowIndex][cellIndex - 1].hasBomb,
              table[rowIndex - 1][cellIndex + 1].hasBomb,
              table[rowIndex - 1][cellIndex].hasBomb,
              table[rowIndex - 1][cellIndex - 1].hasBomb,
            ]
          } else {
            cellsAround = [
              table[rowIndex][cellIndex + 1].hasBomb,
              table[rowIndex][cellIndex - 1].hasBomb,
              table[rowIndex - 1][cellIndex + 1].hasBomb,
              table[rowIndex - 1][cellIndex].hasBomb,
              table[rowIndex - 1][cellIndex - 1].hasBomb,
              table[rowIndex + 1][cellIndex + 1].hasBomb,
              table[rowIndex + 1][cellIndex].hasBomb,
              table[rowIndex + 1][cellIndex - 1].hasBomb,
            ]
          }

          break
      }

      let count = 0
      cellsAround.map(val => {
        if (val) {
          count++
        }
        return val
      })
      cell.bombsAround = count
      return cell
    })
    return row
  })

  return newtable
}
