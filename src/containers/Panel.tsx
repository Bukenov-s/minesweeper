import React, { FC, useCallback } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '~/redux/actions'

const mapStateToProps = ({ minesweeper }) => ({
  gameOver: minesweeper.gameOver,
  bombs: minesweeper.bombs,
})

const mapDispatchToProps = {
  startGame: actionCreators.startGame,
}

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {}

const Panel: FC<Props> = ({ gameOver, bombs, startGame }) => {

  const handleStartClick = useCallback(() => {
    startGame()
  }, [])

  return (
    <div className="panel">
      <div>000</div>
      <span style={{ flex: 1 }} />
      <button
        onClick={handleStartClick}
        className="restart"
      >
        restart
      </button>
      <span style={{ flex: 1 }} />
      <div>9</div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel)
