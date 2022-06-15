import React from "react"

import { IAppointment } from "#types/IAppointment"
import { getAppointmentTimeOfDayPrettified } from "#utils/getAppointmentTimeOfDayPrettified"

interface IProps {
  appointment: IAppointment
}

export const Appointment: React.FC<IProps> = ({ appointment }) => {
  return (
    <>
      <h2>Todays appointment at {getAppointmentTimeOfDayPrettified({ aDate: appointment.timeSlot })}</h2>
      <p>
        Customer name:{" "}
        <strong>
          {appointment.customer.firstName} {appointment.customer.lastName}
        </strong>
      </p>
      <p>
        Customer phone: <strong>{appointment.customer.phoneNumber}</strong>
      </p>
      <p>
        Service: <strong>{appointment.serviceName}</strong>
      </p>
      <p>
        Notes: <strong>{appointment.notes}</strong>
      </p>
    </>
  )
}
