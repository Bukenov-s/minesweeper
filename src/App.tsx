import { hot } from 'react-hot-loader/root';
import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getDifficulty, getGameOver, getResult, getBombsCounter, getTimer, getMines, getBombs } from './redux/selectors';
import Table from '~/containers/Table';
import Panel from '~/containers/Panel';
import Menu from '~/containers/Menu';
import './style.css';

const App: FC<any> = ({ startNewGame }) => {
  const difficulty = useSelector(getDifficulty);
  const result = useSelector(getResult);
  const game_over = useSelector(getGameOver);
  const bombs_counter = useSelector(getBombsCounter);
  const timer = useSelector(getTimer);
  const mines = useSelector(getMines);
  const bombs = useSelector(getBombs);

  return (
    <div className="app">
      {difficulty === 'unset'
        ? <Menu />
        : (
          <Fragment>
            <Panel
              difficulty={difficulty}
              bombs_counter={bombs_counter}
              timer={timer}
            />
            <Table
              difficulty={difficulty}
              mines={mines}
              game_over={game_over}
              result={result}
              bombs={bombs}
            />
          </Fragment>
        )
      }
    </div>
  );
};

export default hot(App);
