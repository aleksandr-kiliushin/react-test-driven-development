import React from "react"

import Appointment from "./Appointment"
import getAppointmentTimeOfDay from "./getAppointmentTimeOfDay"
import { Appointment as IAppointment } from "./types"

type AppointmentsDayViewProps = {
  appointments: IAppointment[]
}

const AppointmentsDayView: React.FC<AppointmentsDayViewProps> = ({ appointments }) => {
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = React.useState<number>(0)

  return (
    <ol className="appointmentsDayView">
      {appointments.map((anAppointment, index) => {
        return (
          <li key={anAppointment.startsAt}>
            <button onClick={() => setSelectedAppointmentIndex(index)} type="button">
              {getAppointmentTimeOfDay({ aTimestamp: anAppointment.startsAt })}
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

export default AppointmentsDayView
