import { combineReducers } from "redux"

import { customersSearchReducer } from "./customers-search"
import { todaysAppointmentsReducer } from "./todays-appointments"

export const rootReducer = combineReducers({
  todaysAppointments: todaysAppointmentsReducer,
  customersSearch: customersSearchReducer,
})
