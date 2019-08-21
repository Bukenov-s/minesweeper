import React, { FC, useCallback, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { startEasyGame, startNormalGame, startHardGame } from '~/redux/actions';

const Menu: FC<{}> = () => {
  const dispatch = useDispatch();

  const handleStartClick: MouseEventHandler<HTMLButtonElement> = useCallback((evt) => {
    const { value } = evt.currentTarget;

    if (value === 'easy') {
      dispatch(startEasyGame());
    }

    if (value === 'normal') {
      dispatch(startNormalGame());
    }

    if (value === 'hard') {
      dispatch(startHardGame());
    }
  }, [startEasyGame, startNormalGame, startHardGame]);

  return (
    <div
      style={{
        width: '243px',
        height: '243px',
        backgroundColor: 'pink',
      }}
    >
      <button
        onClick={handleStartClick}
        type="button"
        value="easy"
      >
        easy
      </button>
      <button
        onClick={handleStartClick}
        type="button"
        value="normal"
      >
        normal
      </button>
      <button
        onClick={handleStartClick}
        type="button"
        value="hard"
      >
        hard
      </button>
    </div>
  );
};

export default Menu;
