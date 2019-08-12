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
      <button
        onClick={() => dispatch(actionCreators.startEasyGame())}
        type="button"
      >
        easy
      </button>
      <button
        onClick={() => dispatch(actionCreators.startNormalGame())}
        type="button"
      >
        normal
      </button>
      <button
        onClick={() => dispatch(actionCreators.startHardGame())}
        type="button"
      >
        hard
      </button>
    </div>
  );
};

export default Menu;
