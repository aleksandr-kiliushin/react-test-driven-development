import React from "react"

import { TimeSlot } from "./RadioButton"
import { TimeSlotTable } from "./TimeSlotTable"

export type IFieldName = "serviceName"

interface IProps {
  availableTimeSlots: TimeSlot[]
  availableServiceNames: string[]
  defaultServiceName: string
  onSubmit(formValues: { serviceName: string; slotTimestamp: string }): void
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

export const AppointmentForm: React.FC<IProps> = ({
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
