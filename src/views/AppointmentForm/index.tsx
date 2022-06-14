import React from "react"

import { TimeSlot } from "./RadioButtonIfAvailable"
import TimeSlotTable from "./TimeSlotTable"

export type FieldName = "serviceName"

type Props = {
  availableTimeSlots: TimeSlot[]
  availableServiceNames: string[]
  defaultServiceName: string
  onSubmit(formValues: { serviceName: string; slotTimestamp: number }): void
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
  const [selectedSlotTimestamp, setSelectedSlotTimestamp] = React.useState<number | null>(
    availableTimeSlots[0]?.startsAt || null
  )

  return (
    <form
      id="appointment"
      onSubmit={(event) => {
        event.preventDefault()
        if (selectedSlotTimestamp === null) return
        onSubmit({ serviceName: selectedServiceName, slotTimestamp: new Date(selectedSlotTimestamp).toString() })
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
        selectedSlotTimestamp={selectedSlotTimestamp}
        setSelectedSlotTimestamp={setSelectedSlotTimestamp}
        today={today}
      />
      <input type="submit" />
    </form>
  )
}

export default AppointmentForm
