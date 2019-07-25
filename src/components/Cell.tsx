import React, {
  FC,
  MouseEventHandler,
  useCallback,
  memo
} from 'react';

interface IProps {
  id: string;
  row: number;
  col: number;
  has_bomb: boolean;
  open: boolean;
  flagged: boolean;
  bombs_around: number;
  game_over: boolean;
  openCell: (row: number, col: number) => void;
  toggleAsBomb: (row: number, col: number, has_bomb: boolean) => void;
}

const Cell: FC<IProps> = memo(({
  id,
  row,
  col,
  has_bomb,
  open,
  flagged,
  bombs_around,
  game_over,
  openCell,
  toggleAsBomb,
}) => {
  const handleClick = useCallback(() => {
    if (open || flagged) {
      return null;
    }

    openCell(row, col);
  }, [open, flagged, row, col, openCell]);

  const handleRightClick: MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    evt.preventDefault();
    if (open) {
      return;
    }

    toggleAsBomb(row, col, has_bomb);
  }, [open, row, col, has_bomb, toggleAsBomb]);

  return (
    <button
      className={
        `cell ${flagged ? 'flagged' : ''} ${open ? 'open' : ''} ${(game_over && !open) ? 'exploded' : ''}`
      }
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={game_over}
      id={id}
      type="button"
    >
      {bombs_around > 0 && open ? bombs_around : null}
    </button>
  );
});

export default Cell;
