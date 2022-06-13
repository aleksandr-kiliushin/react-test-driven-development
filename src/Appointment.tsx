import React from "react"

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
      {appointments.map((anAppointment) => {
        return <div key={anAppointment.startsAt}></div>
      })}
    </ol>
  )
}
