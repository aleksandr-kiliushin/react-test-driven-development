import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"

import { load, save } from "./middleware/localStorage"
import { duplicateForSharing, sharingSaga } from "./middleware/sharingSagas"
import { environmentReducer } from "./reducers/environment"
import { scriptReducer } from "./reducers/script"
import { withUndoRedo } from "./reducers/withUndoRedo"

export const configureStore = (storeEnhancers = [], initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      script: withUndoRedo(scriptReducer),
      environment: environmentReducer,
    }),
    initialState,
    compose(...[applyMiddleware(save, duplicateForSharing, sagaMiddleware), ...storeEnhancers])
  )
  sagaMiddleware.run(sharingSaga)
  return store
}

export const configureStoreWithLocalStorage = () => configureStore(undefined, load())
