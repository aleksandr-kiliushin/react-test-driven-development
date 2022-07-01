import { combineReducers } from "redux"

import { appointmentCreationSlice } from "./salon/appointment-creation"
import { customersSearchSlice } from "./salon/customers-search"
import { todaysAppointmentsSlice } from "./salon/todays-appointments"

export const rootReducer = combineReducers({
  appointmentCreation: appointmentCreationSlice.reducer,
  customersSearch: customersSearchSlice.reducer,
  todaysAppointments: todaysAppointmentsSlice.reducer,
})
