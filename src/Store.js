import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

import combinedReducer from './reducers'
import rootSaga from './reducers/saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combinedReducer,
  applyMiddleware(
    sagaMiddleware
  )
)

sagaMiddleware.run(rootSaga)

export default store;