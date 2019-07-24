import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  minesweeper: reducer,
});

/* eslint-disable */
const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);


sagaMiddleware.run(rootSaga);

export default store;
