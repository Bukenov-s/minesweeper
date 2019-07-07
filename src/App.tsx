import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Provider } from 'react-redux'
import store from '~/redux/store'
import Table from '~/containers/Table'
import Panel from '~/containers/Panel'
import './style.css'

const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Panel />
        <Table />
      </div>
    </Provider>
  )
}

export default hot(App)
