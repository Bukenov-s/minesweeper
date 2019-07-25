import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '~/redux/actions';
import { Timer } from '~/components/Timer';

const mapStateToProps = ({ minesweeper }) => ({
  bombs_counter: minesweeper.bombs_counter,
  timer: minesweeper.timer,
});

const mapDispatchToProps = {
  startGame: actionCreators.startGame,
};

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {}

const Panel: FC<Props> = ({
  bombs_counter,
  timer,
  startGame
}) => {
  const handleStartClick = useCallback(() => {
    startGame();
  }, []);

  return (
    <div className="panel">
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
  mapStateToProps,
  mapDispatchToProps,
)(Panel);
