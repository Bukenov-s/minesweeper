import React, { FC, MouseEventHandler, useCallback, memo } from 'react'
import { ICell } from '~/types'

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

  const handleClick = useCallback(() => {
    if (open || flagged) {
      return null;
    }

    openCell(row, col)
  }, [open, flagged, row, col, openCell],
  )

  const handleRightClick: MouseEventHandler<HTMLButtonElement> = useCallback(evt => {
    evt.preventDefault()
    if (open) {
      return;
    }

    toggleAsBomb(row, col)
  }, [open, row, col, toggleAsBomb])

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
