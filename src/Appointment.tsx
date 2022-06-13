import React from "react"

const getAppointmentTimeOfDay = ({ aTimestamp }: { aTimestamp: number }) => {
  const [h, m] = new Date(aTimestamp).toTimeString().split(":")
  return `${h}:${m}`
}

type AppointmentProps = {
  customer: {
    firstName: string
  }
}

export const Appointment: React.FC<AppointmentProps> = ({ customer }) => {
  return <>{customer.firstName}</>
}

type AppointmentsDayViewProps = {
  appointments: {
    startsAt: number
  }[]
}

export const AppointmentsDayView: React.FC<AppointmentsDayViewProps> = ({ appointments }) => {
  return (
    <ol className="appointmentsDayView">
      {appointments.length === 0 && <p>There are no appointments scheduled for today.</p>}

      {appointments.map((anAppointment) => {
        return <li key={anAppointment.startsAt}>{getAppointmentTimeOfDay({ aTimestamp: anAppointment.startsAt })}</li>
      })}
    </ol>
  )
}
