import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actionCreators from '~/redux/actions';
import { Timer } from '~/components/Timer';
import classNames from 'classnames';
import * as styles from '~/styles.scss';

interface IProps {
  bombs_counter: number;
  timer: any;
  difficulty: string;
}

const Panel: FC<IProps> = ({
  bombs_counter,
  timer,
  difficulty,
}) => {
  const dispatch = useDispatch();

  const handleResetClick = useCallback(() => {
    dispatch(actionCreators.resetGame(difficulty));
  }, [difficulty, actionCreators.resetGame]);

  return (
    <div className={classNames(styles.panel, {
      [styles.easy_panel]: difficulty === 'easy',
      [styles.normal_panel]: difficulty === 'normal',
      [styles.hard_panel]: difficulty === 'hard',
    })}
    >
      <Timer timer={timer} />
      <span className="spacer" />
      <button
        onClick={handleResetClick}
        className="restart"
        type="button"
      >
        restart
      </button>
      <span className="spacer" />
      <div>{bombs_counter}</div>
    </div>
  );
};

export default Panel;
