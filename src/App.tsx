import { hot } from 'react-hot-loader/root';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import Table from '~/containers/Table';
import Panel from '~/containers/Panel';
import Menu from '~/containers/Menu';
import * as actionCreators from './redux/actions';
import './style.css';

const mapStateToProps = (state) => ({
  // fill this later
});

const mapDispatchToProps = {
  // fill this later
}

const App: FC<{}> = () => (
  <div className="app">
    <Panel />
    <Table />
  </div>
);


export default hot(App);
