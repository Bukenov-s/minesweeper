import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDifficulty } from '~/redux/selectors';
import * as actionCreators from '~/redux/actions';

const Menu: FC<any> = () => {
  const difficulty = useSelector(getDifficulty);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: '243px',
        height: '243px',
        backgroundColor: 'pink',
      }}
    >
      <button onClick={() => dispatch(actionCreators.startEasyGame(9, 9))}>easy</button>
      <button onClick={() => dispatch(actionCreators.startEasyGame(16, 16))}>normal</button>
      <button onClick={() => dispatch(actionCreators.startEasyGame(30, 16))}>hard</button>
    </div>
  )
}

export default Menu;
