import { hot } from 'react-hot-loader/root';
import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from './redux/selectors';
import Table from '~/containers/Table';
import Panel from '~/containers/Panel';
import Menu from '~/containers/Menu';
import './style.css';

const App: FC<any> = ({ startNewGame }) => {
  const difficulty = useSelector(selectors.getDifficulty);
  const result = useSelector(selectors.getResult);
  const game_over = useSelector(selectors.getGameOver);
  const bombs_counter = useSelector(selectors.getBombsCounter);
  const timer = useSelector(selectors.getTimer);
  const mines = useSelector(selectors.getMines);
  const bombs = useSelector(selectors.getBombs);

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
