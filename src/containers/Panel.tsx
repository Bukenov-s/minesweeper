import React, { FC, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '~/redux/actions'

const mapStateToProps = ({ minesweeper }) => ({
  game_over: minesweeper.game_over,
  bombs: minesweeper.bombs,
  timer: minesweeper.timer,
})

const mapDispatchToProps = {
  startGame: actionCreators.startGame,
}

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {}

const Panel: FC<Props> = ({ game_over, bombs, timer, startGame }) => {
  const [time, startTime] = useState(0);

  const handleStartClick = useCallback(() => {
    startGame()
  }, [])

  return (
    <div className="panel">
      <div>000</div>
      <span className="spacer" />
      <button
        onClick={handleStartClick}
        className="restart"
      >
        restart
      </button>
      <span className="spacer" />
      <div>9</div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel)
