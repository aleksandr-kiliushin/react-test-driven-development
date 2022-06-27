import { ITimeSlot } from "#types/ITimeSlot"

import { AppThunk } from "./index"

export interface IState {
  availableTimeSlots: ITimeSlot[]
}

const initialState: IState = {
  availableTimeSlots: [],
}

export const appointmentCreationReducer = (
  state: IState = initialState,
  action: {
    payload: { availableTimeSlots: ITimeSlot[] }
    type: "appointment-creation/setAvailableTimeSlots"
  }
): IState => {
  switch (action.type) {
    case "appointment-creation/setAvailableTimeSlots": {
      return {
        ...state,
        availableTimeSlots: action.payload.availableTimeSlots,
      }
    }
    default:
      return state
  }
}

export const fetchAndSetAvailableTimeSlots = (): AppThunk => {
  return (dispatch) => {
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
        dispatch({
          payload: { availableTimeSlots },
          type: "appointment-creation/setAvailableTimeSlots",
        })
      })
  }
}
