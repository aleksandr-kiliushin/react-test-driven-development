import React from "react"

import TimeSlotTable from "./TimeSlotTable"

export type FieldName = "serviceName"

type Props = {
  availableServiceNames: string[]
  defaultServiceName: string
  salonClosesAt: number
  salonOpensAt: number
}

const AppointmentForm: React.FC<Props> = ({
  availableServiceNames,
  defaultServiceName,
  salonClosesAt,
  salonOpensAt,
}) => {
  return (
    <form id="appointment">
      <select name="serviceName" onChange={() => {}} value={defaultServiceName}>
        {availableServiceNames.map((aServiceName) => (
          <option key={aServiceName}>{aServiceName}</option>
        ))}
      </select>
      <TimeSlotTable salonClosesAt={salonClosesAt} salonOpensAt={salonOpensAt} />
    </form>
  )
}

export default AppointmentForm
