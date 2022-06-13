import React from "react"

import { Appointment as IAppointment } from "./types"

type Props = {
  appointment: IAppointment
}

const Appointment: React.FC<Props> = ({ appointment }) => {
  return (
    <>
      <p>Customer first name: {appointment.customer.firstName}</p>
      <p>Customer last name: {appointment.customer.lastName}</p>
      <p>Customer last name: {appointment.customer.phoneNumber}</p>
    </>
  )
}

export default Appointment
