import React from "react"

import { IAppointment } from "#types/IAppointment"

import { AppointmentsDayView } from "./index"

interface IAppointmentsDayViewLoaderProps {
  today: Date
}

export const AppointmentsDayViewLoader: React.FC<IAppointmentsDayViewLoaderProps> = ({ today }) => {
  const [appointments, setAppointments] = React.useState<IAppointment[]>([])

  const from = today.setHours(0, 0, 0, 0)
  const to = today.setHours(23, 59, 59, 999)

  React.useEffect(() => {
    globalThis
      .fetch(`/appointments/${from}-${to}`, {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((appointments) => {
        // @ts-ignore
        return appointments.map((anAppointment) => ({
          ...anAppointment,
          timeSlot: {
            ...anAppointment.timeSlot,
            startsAt: new Date(anAppointment.timeSlot.startsAt),
          },
        }))
      })
      .then(setAppointments)
  }, [from, to])

  return <AppointmentsDayView appointments={appointments} />
}
