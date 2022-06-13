import React from "react"

import { Appointment as IAppointment } from "./types"

type Props = {
  appointment: IAppointment
}

const Appointment: React.FC<Props> = ({ appointment }) => {
  return <>{appointment.customer.firstName}</>
}

export default Appointment
