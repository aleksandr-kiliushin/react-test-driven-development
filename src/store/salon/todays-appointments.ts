import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IAppointment } from "#types/salon/IAppointment"

export interface IState {
  appointments: IAppointment[]
}

const initialState: IState = {
  appointments: [],
}

export const todaysAppointmentsSlice = createSlice({
  initialState,
  name: "todays-appointments",
  reducers: {
    setTodaysAppointments(state, action: PayloadAction<IAppointment[]>) {
      state.appointments = action.payload
    },
  },
})

export const fetchAndSetTodaysAppointments = createAsyncThunk(
  "todays-appointments/fetchAndSetTodaysAppointments",
  ({ today }: { today: Date }, thunkApi) => {
    const from = today.setHours(0, 0, 0, 0)
    const to = today.setHours(23, 59, 59, 999)

    globalThis
      .fetch(`/api/appointments/${from}-${to}`, {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((appointments) => {
        thunkApi.dispatch(todaysAppointmentsSlice.actions.setTodaysAppointments(appointments))
      })
  }
)

export const { setTodaysAppointments } = todaysAppointmentsSlice.actions
