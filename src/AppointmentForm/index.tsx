import React from "react"

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
    </form>
  )
}

export default AppointmentForm
