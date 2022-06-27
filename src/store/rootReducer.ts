import { combineReducers } from "redux"

import { appointmentCreationReducer } from "./appointment-creation"
import { customersSearchSlice } from "./customers-search"
import { todaysAppointmentsSlice } from "./todays-appointments"

export const rootReducer = combineReducers({
  appointmentCreation: appointmentCreationReducer,
  customersSearch: customersSearchSlice.reducer,
  todaysAppointments: todaysAppointmentsSlice.reducer,
})
