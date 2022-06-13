import React from "react"

export type FieldName = "serviceName"

type Props = {}

const AppointmentForm: React.FC<Props> = () => {
  return (
    <form id="appointment">
      <select name="serviceName"></select>
    </form>
  )
}

export default AppointmentForm
