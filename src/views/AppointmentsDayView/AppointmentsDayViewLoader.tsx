import React from "react"

import { IAppointment } from "#types/IAppointment"

import { AppointmentsDayView } from "./index"

interface IAppointmentsDayViewLoaderProps {
  today: Date
}

export const AppointmentsDayViewLoader: React.FC<IAppointmentsDayViewLoaderProps> = ({ today }) => {
  const [appointments, setAppointments] = React.useState<IAppointment[]>([])

  React.useEffect(() => {
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
        return appointments.map((anAppointment) => ({
          ...anAppointment,
          timeSlot: {
            ...anAppointment.timeSlot,
            startsAt: new Date(anAppointment.timeSlot.startsAt),
          },
        }))
      })
      .then(setAppointments)
  }, [today])

  return <AppointmentsDayView appointments={appointments} />
}
