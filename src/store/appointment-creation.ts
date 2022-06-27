import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ITimeSlot } from "#types/ITimeSlot"

export interface IState {
  availableTimeSlots: ITimeSlot[]
}

const initialState: IState = {
  availableTimeSlots: [],
}

export const appointmentCreationSlice = createSlice({
  initialState,
  name: "appointment-creation",
  reducers: {
    setAvailableTimeSlots(state, action: PayloadAction<ITimeSlot[]>) {
      state.availableTimeSlots = action.payload
    },
  },
})

export const fetchAndSetAvailableTimeSlots = createAsyncThunk(
  "todays-appointments/fetchAndSetAvailableTimeSlots",
  (_, thunkApi) => {
    globalThis
      .fetch("/api/availableTimeSlots", {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
      .then((response) => response.json())
      .then((availableTimeSlots) => {
        return availableTimeSlots.map((aTimeSlot: { startsAt: string; stylist: ITimeSlot["stylist"] }) => ({
          startsAt: new Date(aTimeSlot.startsAt.toString()),
          stylist: aTimeSlot.stylist,
        }))
      })
      .then((availableTimeSlots) => {
        thunkApi.dispatch(appointmentCreationSlice.actions.setAvailableTimeSlots(availableTimeSlots))
      })
  }
)

export const { setAvailableTimeSlots } = appointmentCreationSlice.actions
