import { combineReducers } from "redux"

import { appointmentCreationSlice } from "./appointment-creation"
import { customersSearchSlice } from "./customers-search"
import { todaysAppointmentsSlice } from "./todays-appointments"

export const rootReducer = combineReducers({
  appointmentCreation: appointmentCreationSlice.reducer,
  customersSearch: customersSearchSlice.reducer,
  todaysAppointments: todaysAppointmentsSlice.reducer,
})
