import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '~/redux/actions';
import { Timer } from '~/components/Timer';
import classNames from 'classnames';

interface IProps {
  bombs_counter: number;
  timer: any;
  difficulty: string;
}

const mapDispatchToProps = {
  startGame: actionCreators.startGame,
  resetGame: actionCreators.resetGame,
};

type Props = IProps & typeof mapDispatchToProps & {}

const Panel: FC<Props> = ({
  bombs_counter,
  timer,
  difficulty,
  resetGame,
}) => {
  const handleStartClick = useCallback(() => {
    resetGame(difficulty);
  }, [difficulty, resetGame]);

  return (
    <div className={classNames('panel', {
      ['easy_panel']: difficulty === 'easy',
      ['normal_panel']: difficulty === 'normal',
      ['hard_panel']: difficulty === 'hard',
    })}>
      <Timer timer={timer} />
      <span className="spacer" />
      <button
        onClick={handleStartClick}
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

export default connect(
  null,
  mapDispatchToProps,
)(Panel);
