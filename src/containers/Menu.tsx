import React, { FC, useCallback, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { startEasyGame, startNormalGame, startHardGame } from '~/redux/actions';
import * as styles from '~/styles.scss';

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
      className={styles.menu_container}
    >
      <button
        onClick={handleStartClick}
        type="button"
        value="easy"
        className={styles.difficulty_level}
      >
        easy
      </button>
      <button
        onClick={handleStartClick}
        type="button"
        value="normal"
        className={styles.difficulty_level}
      >
        normal
      </button>
      <button
        onClick={handleStartClick}
        type="button"
        value="hard"
        className={styles.difficulty_level}
      >
        hard
      </button>
    </div>
  );
};

export default Menu;
