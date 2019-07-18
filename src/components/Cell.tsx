import React, { useCallback, memo } from 'react'
import { ICell } from '~/types'
import * as actionCreators from '~/redux/actions'

const CellActions = {
  openCell: actionCreators.openCell,
  stopGame: actionCreators.stopGame,
  toggleAsBomb: actionCreators.toggleAsBomb,
}

// type Props = ICell & typeof CellActions & { gameOver: boolean }

const Cell: React.FC<any> = memo(({
  gameOver,
  has_bomb,
  bombs_around,
  open,
  flagged,
  row,
  col,
  neighbours,
  openCell,
  stopGame,
  toggleAsBomb,
  id,
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    evt => {
      //evt.preventDefault()
      //console.log({ id, row, col, has_bomb, bombs_around, open, flagged });
      if (open || flagged) {
        console.log('click ignored because cell is either open or flagged');
        return;
      }

      // if (neighbours.length) {
      //   // TODO: create a saga for this
      //   openManyCells(neighbours);
      // }

      console.log(has_bomb);
      if (has_bomb) {
        stopGame();
        console.log(`cell with id ${id} had bomb`);
        return;
      }

      openCell(id, row, col)
      console.log(`cell with id ${id} is empty`)
    },
    [],
  )

  const handleRightClick: React.MouseEventHandler<
    HTMLButtonElement
  > = useCallback(evt => {
    evt.preventDefault()
    if (open) {
      return
    }
    toggleAsBomb(id, row, col)
  }, [])

  return (
    <button
      className={
        `cell 
        ${flagged && 'flagged'} 
        ${open && 'open'} 
        ${gameOver && 'exploded'}`
      }
      //style={has_bomb ? { background: 'red' } : null}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={gameOver}
    >
      {bombs_around > 0 && open ? bombs_around : null}
    </button>
  )
})

export default Cell
