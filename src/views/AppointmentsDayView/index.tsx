import React from "react"

import { IAppointment } from "#types/IAppointment"
import { getAppointmentTimeOfDayPrettified } from "#utils/getAppointmentTimeOfDayPrettified"

import { Appointment } from "./Appointment"

interface IAppointmentsDayViewProps {
  appointments: IAppointment[]
}

export const AppointmentsDayView: React.FC<IAppointmentsDayViewProps> = ({ appointments }) => {
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = React.useState<number>(0)

  return (
    <div className="flex gap-x-10">
      <ol className="appointmentsDayView">
        {appointments.map((anAppointment, index) => {
          return (
            <li key={anAppointment.timeSlot.toString()}>
              <button
                className="border border-cyan-900 bg-cyan-500 hover:bg-cyan-600"
                onClick={() => setSelectedAppointmentIndex(index)}
                type="button"
              >
                {getAppointmentTimeOfDayPrettified({ aDate: anAppointment.timeSlot })}
              </button>
            </li>
          )
        })}
      </ol>
      <div>
        {appointments.length === 0 ? (
          <p>There are no appointments scheduled for today.</p>
        ) : (
          <Appointment appointment={appointments[selectedAppointmentIndex]} />
        )}
      </div>
    </div>
  )
}
