import React from "react"

import TimeSlotTable, { TimeSlot } from "./TimeSlotTable"

export type FieldName = "serviceName"

type Props = {
  availableTimeSlots: TimeSlot[]
  availableServiceNames: string[]
  defaultServiceName: string
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

const AppointmentForm: React.FC<Props> = ({
  availableTimeSlots,
  availableServiceNames,
  defaultServiceName,
  salonClosesAt,
  salonOpensAt,
  today,
}) => {
  return (
    <form id="appointment">
      <label htmlFor="serviceName">Service</label>
      <select id="serviceName" name="serviceName" onChange={() => {}} value={defaultServiceName}>
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
