import React, { useCallback } from 'react'
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

const Panel: React.FC<Props> = ({ gameOver, bombs, startGame }) => {

  const handleStartClick = useCallback(() => {
    startGame()
  }, [])

  return (
    <div className="panel">
      <button
        onClick={handleStartClick}
        className="restart"
      >
        restart
      </button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel)
