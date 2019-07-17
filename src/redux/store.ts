import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const initialState = {}
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  minesweeper: reducer,
})


const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)


sagaMiddleware.run(rootSaga);

export default store
