import { hot } from 'react-hot-loader/root';
import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getDifficulty } from './redux/selectors';
import Table from '~/containers/Table';
import Panel from '~/containers/Panel';
import Menu from '~/containers/Menu';
import * as actionCreators from './redux/actions';
import './style.css';

const App: FC<any> = ({ startNewGame }) => {
  const difficulty = useSelector(getDifficulty);

  return (
    <div className="app">
      {difficulty === 'unset'
        ? <Menu />
        : (
          <Fragment>
            <Panel />
            <Table />
          </Fragment>
        )
      }
    </div>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
export default hot(App);
