import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '~/redux/actions';
import Cell from '~/components/Cell';
import classNames from 'classnames';

const mapStateToProps = ({ minesweeper }) => ({
  mines: minesweeper.mines,
  game_over: minesweeper.game_over,
  result: minesweeper.result,
  bombs: minesweeper.bombs,
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
  return (
    <div
      className={classNames('table', {
        ['easy_table']: difficulty === 'easy',
        ['normal_table']: difficulty === 'normal',
        ['hard_table']: difficulty === 'hard',
      }
      )}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
