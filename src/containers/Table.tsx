import React, { FC } from 'react';
import Cell from '~/components/Cell';
import classNames from 'classnames';
import * as styles from '~/styles.scss';

interface IProps {
  mines: any;
  game_over: boolean;
  result: 'unknown' | 'win' | 'loss';
  bombs: number;
  difficulty: string;
}

const Table: FC<IProps> = ({
  mines,
  game_over,
  result,
  difficulty,
}) => {

  return (
    <div
      className={classNames(styles.table, {
        [styles.easy_table]: difficulty === 'easy',
        [styles.normal_table]: difficulty === 'normal',
        [styles.hard_table]: difficulty === 'hard',
      })}
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
                game_over={game_over}
                result={result}
              />
            )))
      }
    </div>
  );
};

export default Table;
