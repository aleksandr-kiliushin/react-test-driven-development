import React from "react"

interface IAppointmentsDayViewLoaderProps {
  today: Date
}

export const AppointmentsDayViewLoader: React.FC<IAppointmentsDayViewLoaderProps> = ({ today }) => {
  const from = today.setHours(0, 0, 0, 0)
  const to = today.setHours(23, 59, 59, 999)

  React.useEffect(() => {
    const fetchAppointments = () => {
      globalThis.fetch(`/appointments/${from}-${to}`, {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
    }
    fetchAppointments()
  }, [from, to])

  return null
}
