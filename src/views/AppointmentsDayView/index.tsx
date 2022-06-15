import React from "react"

import { IAppointment } from "#types/IAppointment"
import { getAppointmentTimeOfDayPrettified } from "#utils/getAppointmentTimeOfDayPrettified"

import { Appointment } from "./Appointment"

interface IProps {
  appointments: IAppointment[]
}

export const AppointmentsDayView: React.FC<IProps> = ({ appointments }) => {
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = React.useState<number>(0)

  return (
    <ol className="appointmentsDayView">
      {appointments.map((anAppointment, index) => {
        return (
          <li key={anAppointment.timeSlot.toString()}>
            <button onClick={() => setSelectedAppointmentIndex(index)} type="button">
              {getAppointmentTimeOfDayPrettified({ aDate: anAppointment.timeSlot })}
            </button>
          </li>
        )
      })}

      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment appointment={appointments[selectedAppointmentIndex]} />
      )}
    </ol>
  )
}
