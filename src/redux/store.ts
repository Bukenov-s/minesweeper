import { createStore, combineReducers } from 'redux'
import reducer from './reducers'

const initialState = {}

const rootReducer = combineReducers({
  minesweeper: reducer,
})

const store = createStore(
  rootReducer,
  initialState,
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ &&
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store
