import React, { FC } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '~/redux/actions';

const mapStateToProps = ({ minesweeper }) => ({
  // fill this later
});

const mapDispatchToProps = {
  startNewGame: actionCreators.startNewGame,
};

interface IProps {

}

const Menu: FC<{}> = () => {
  return (
    <div
      style={{
        width: '243px',
        height: '243px',
        backgroundColor: 'pink',
      }}
    >
      <button>easy</button>
      <button>normal</button>
      <button>hard</button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
