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
  openCell: actionCreators.openCell,
  toggleAsBomb: actionCreators.toggleAsBomb,
}

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & {}

const Table: React.FC<any> = ({
  mines,
  gameOver,
  openCell,
  toggleAsBomb,
}) => {
  return (
    <div className="table">
      {Object.keys(mines) // returns [0,1,2,3,4,5,6,7,8]
        .map(arr =>
          Object.values(
            mines[arr], // returns array of objects
          ).map(({
            id,
            row,
            col,
            has_bomb,
            bombs_around,
            open,
            flagged,
            neighbours,
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
              neighbours={neighbours}
              openCell={openCell}
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
