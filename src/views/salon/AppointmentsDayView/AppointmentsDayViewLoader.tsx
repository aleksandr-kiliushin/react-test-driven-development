import React from "react"

import { fetchAndSetTodaysAppointments } from "#store/salon/todays-appointments"
import { useAppDispatch } from "#utils/useAppDispatch"
import { useAppSelector } from "#utils/useAppSelector"

import { AppointmentsDayView } from "./index"

interface IAppointmentsDayViewLoaderProps {
  today: Date
}

export const AppointmentsDayViewLoader: React.FC<IAppointmentsDayViewLoaderProps> = ({ today }) => {
  const dispatch = useAppDispatch()
  const appointments = useAppSelector((state) => state.todaysAppointments.appointments)

  React.useEffect(() => {
    dispatch(fetchAndSetTodaysAppointments({ today }))
  }, [today])

  return <AppointmentsDayView appointments={appointments} />
}
