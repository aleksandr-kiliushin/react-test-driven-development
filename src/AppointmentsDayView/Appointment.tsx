import React from "react"

import getAppointmentTimeOfDay from "./getAppointmentTimeOfDay"
import { Appointment as IAppointment } from "./types"

type Props = {
  appointment: IAppointment
}

const Appointment: React.FC<Props> = ({ appointment }) => {
  return (
    <>
      <h2>Todays appointment at {getAppointmentTimeOfDay({ aTimestamp: appointment.startsAt })}</h2>
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

export default Appointment
