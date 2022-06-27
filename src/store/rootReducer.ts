import { combineReducers } from "redux"

import { appointmentCreationReducer } from "./appointment-creation"
import { customersSearchReducer } from "./customers-search"
import { todaysAppointmentsSlice } from "./todays-appointments"

export const rootReducer = combineReducers({
  appointmentCreation: appointmentCreationReducer,
  customersSearch: customersSearchReducer,
  todaysAppointments: todaysAppointmentsSlice.reducer,
})
