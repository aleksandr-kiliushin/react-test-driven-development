import React from "react"

import { IAppointment } from "#types/salon/IAppointment"
import { getAppointmentTimeOfDayPrettified } from "#utils/getAppointmentTimeOfDayPrettified"

interface IAppointmentProps {
  appointment: IAppointment
}

export const Appointment: React.FC<IAppointmentProps> = ({ appointment }) => {
  return (
    <>
      <h2 className="text-2xl mb-2 font-semibold">
        Todays appointment at {getAppointmentTimeOfDayPrettified({ aDate: appointment.timeSlot.startsAt })}
      </h2>
      <p>
        <label>Customer name</label>:{" "}
        <strong>
          {appointment.customer.firstName} {appointment.customer.lastName}
        </strong>
      </p>
      <p>
        <label>Customer phone</label>: <strong>{appointment.customer.phoneNumber}</strong>
      </p>
      <p>
        <label>Service</label>: <strong>{appointment.serviceName}</strong>
      </p>
      <p>
        <label>Notes</label>: <strong>{appointment.notes}</strong>
      </p>
    </>
  )
}
