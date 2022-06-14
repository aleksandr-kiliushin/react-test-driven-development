import React from "react"

import TimeSlotTable from "./TimeSlotTable"

export type FieldName = "serviceName"

type Props = {
  availableServiceNames: string[]
  defaultServiceName: string
}

const AppointmentForm: React.FC<Props> = ({ availableServiceNames, defaultServiceName }) => {
  return (
    <form id="appointment">
      <select name="serviceName" onChange={() => {}} value={defaultServiceName}>
        {availableServiceNames.map((aServiceName) => (
          <option key={aServiceName}>{aServiceName}</option>
        ))}
      </select>
      <TimeSlotTable />
    </form>
  )
}

export default AppointmentForm
