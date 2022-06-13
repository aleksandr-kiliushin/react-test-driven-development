import React from "react"

import { Appointment as IAppointment } from "./types"

type Props = {
  appointment: IAppointment
}

const Appointment: React.FC<Props> = ({ appointment }) => {
  return (
    <>
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
