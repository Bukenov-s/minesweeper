import React, { FC, useCallback, memo } from 'react'
import { ICell } from '~/types'
import * as actionCreators from '~/redux/actions'

interface IProps {
  id: string;
  row: number;
  col: number;
  has_bomb: boolean;
  open: boolean;
  flagged: boolean;
  neighbours: any[];
  bombs_around: number;
  gameOver: boolean;
  openCell: (row: number, col: number) => any;
  toggleAsBomb: (row: number, col: number) => any;
}

const Cell: FC<IProps> = memo(({
  id,
  row,
  col,
  has_bomb,
  open,
  flagged,
  neighbours,
  bombs_around,
  gameOver,
  openCell,
  toggleAsBomb,
}) => {
  const handleClick = useCallback(
    () => {
      if (open || flagged) {
        console.log('click ignored because cell is either open or flagged');
        return;
      }

      openCell(row, col)
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

    toggleAsBomb(row, col)
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
