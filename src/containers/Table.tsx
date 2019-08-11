import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '~/redux/actions';
import Cell from '~/components/Cell';

const mapStateToProps = ({ minesweeper }) => ({
  mines: minesweeper.mines,
  game_over: minesweeper.game_over,
  result: minesweeper.result,
  bombs: minesweeper.bombs,
  difficulty: minesweeper.difficulty,
});

const mapDispatchToProps = {
  openCell: actionCreators.openCell,
  toggleAsBomb: actionCreators.toggleAsBomb,
};

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {};

const Table: FC<Props> = ({
  mines,
  game_over,
  result,
  difficulty,
  openCell,
  toggleAsBomb,
}) => {
  const getWidthAndHeight = useCallback((difficulty) => {
    if (difficulty === 'easy') {
      return { width: '243px', height: '243px' };
    }

    if (difficulty === 'normal') {
      return { width: '432px', height: '432px' };
    }

    if (difficulty === 'hard') {
      return { width: '810px', height: '432px' };
    }
  }, [difficulty]);

  return (
    <div
      className="table"
      style={getWidthAndHeight(difficulty)}
    >
      {
        Object.keys(mines)
          .map(arr => Object.values(mines[arr]).map(({
            id,
            row,
            col,
            has_bomb,
            bombs_around,
            open,
            flagged,
          }: any) => (
              <Cell
                key={id}
                id={id}
                row={row}
                col={col}
                has_bomb={has_bomb}
                bombs_around={bombs_around}
                open={open}
                flagged={flagged}
                openCell={openCell}
                toggleAsBomb={toggleAsBomb}
                game_over={game_over}
                result={result}
              />
            )))
      }
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
