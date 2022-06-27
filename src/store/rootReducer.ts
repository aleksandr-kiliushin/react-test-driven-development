import { combineReducers } from "redux"

import { customersSearchReducer } from "./customers-search"

export const rootReducer = combineReducers({
  customersSearch: customersSearchReducer,
})
