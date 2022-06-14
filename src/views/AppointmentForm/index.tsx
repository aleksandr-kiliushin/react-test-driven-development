import React from "react"

import { TimeSlot } from "./RadioButtonIfAvailable"
import TimeSlotTable from "./TimeSlotTable"

export type FieldName = "serviceName"

type Props = {
  availableTimeSlots: TimeSlot[]
  availableServiceNames: string[]
  defaultServiceName: string
  onSubmit(formValues: { serviceName: string }): void
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

const AppointmentForm: React.FC<Props> = ({
  availableTimeSlots,
  availableServiceNames,
  defaultServiceName,
  onSubmit,
  salonClosesAt,
  salonOpensAt,
  today,
}) => {
  const [selectedServiceName, setSelectedServiceName] = React.useState<string>(defaultServiceName)

  return (
    <form
      id="appointment"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ serviceName: selectedServiceName })
      }}
    >
      <label htmlFor="serviceName">Service</label>
      <select
        id="serviceName"
        name="serviceName"
        onChange={(event) => {
          setSelectedServiceName(event.target.value)
        }}
        value={selectedServiceName}
      >
        {availableServiceNames.map((aServiceName) => (
          <option key={aServiceName}>{aServiceName}</option>
        ))}
      </select>
      <TimeSlotTable
        availableTimeSlots={availableTimeSlots}
        salonClosesAt={salonClosesAt}
        salonOpensAt={salonOpensAt}
        today={today}
      />
    </form>
  )
}

export default AppointmentForm
