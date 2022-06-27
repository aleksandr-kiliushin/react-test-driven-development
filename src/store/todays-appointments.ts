import { IAppointment } from "#types/IAppointment"
import { ITimeSlot } from "#types/ITimeSlot"

import { AppThunk } from "./index"

export interface IState {
  appointments: IAppointment[]
}

const initialState: IState = {
  appointments: [],
}

export const todaysAppointmentsReducer = (
  state: IState = initialState,
  action: {
    payload: { appointments: IAppointment[] }
    type: "todays-appointments/setTodaysAppointments"
  }
): IState => {
  switch (action.type) {
    case "todays-appointments/setTodaysAppointments": {
      return {
        ...state,
        appointments: action.payload.appointments,
      }
    }
    default:
      return state
  }
}

interface IResponseAppointment {
  customer: IAppointment["customer"]
  notes: IAppointment["notes"]
  serviceName: IAppointment["serviceName"]
  timeSlot: {
    startsAt: string
    stylist: ITimeSlot["stylist"]
  }
}

export const fetchAndSetTodaysAppointments = ({ today }: { today: Date }): AppThunk => {
  return (dispatch) => {
    const from = today.setHours(0, 0, 0, 0)
    const to = today.setHours(23, 59, 59, 999)

    globalThis
      .fetch(`/api/appointments/${from}-${to}`, {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((appointments: IResponseAppointment[]) => {
        return appointments.map((anAppointment) => ({
          ...anAppointment,
          timeSlot: {
            ...anAppointment.timeSlot,
            startsAt: new Date(anAppointment.timeSlot.startsAt),
          },
        }))
      })
      .then((appointments) => {
        dispatch({
          payload: { appointments },
          type: "todays-appointments/setTodaysAppointments",
        })
      })
  }
}
