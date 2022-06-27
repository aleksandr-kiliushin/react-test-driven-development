import { configureStore } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"

import { rootReducer } from "./rootReducer"

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction> // TODO: Maybe delete.
