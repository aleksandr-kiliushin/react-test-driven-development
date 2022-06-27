import { AnyAction, applyMiddleware, legacy_createStore } from "redux"
import thunk, { ThunkAction } from "redux-thunk"

import { rootReducer } from "./rootReducer"

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
