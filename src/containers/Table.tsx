import React from 'react'
import { connect } from 'react-redux'
import { ICell } from '~/types';
import * as actionCreators from '~/redux/actions'
import Cell from '~/components/Cell'

const mapStateToProps = ({ minesweeper }) => ({
  mines: minesweeper.mines,
  gameOver: minesweeper.gameOver,
  bombs: minesweeper.bombs,
})

const mapDispatchToProps = {
  stopGame: actionCreators.stopGame,
  openCell: actionCreators.openCell,
  toggleAsBomb: actionCreators.toggleAsBomb,
  openManyCells: actionCreators.openManyCells,
}

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {}

const Table: React.FC<any> = ({
  mines,
  gameOver,
  stopGame,
  openCell,
  openManyCells,
  toggleAsBomb,
}) => {
  return (
    <div className="table">
      {Object.keys(mines) // returns [0,1,2,3,4,5,6,7,8]
        .map(arr =>
          Object.values(
            mines[arr], // returns array of objects
          ).map((cell: any) => (
            <Cell
              key={cell.row.toString() + cell.col.toString()}
              id={cell.id}
              row={cell.row}
              col={cell.col}
              has_bomb={cell.has_bomb}
              bombs_around={cell.bombs_around}
              open={cell.open}
              flagged={cell.flagged}
              neighbours={cell.neighbours}
              stopGame={stopGame}
              openCell={openCell}
              openManyCells={openManyCells}
              toggleAsBomb={toggleAsBomb}
              gameOver={gameOver}
            />
          )),
        )}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table)
