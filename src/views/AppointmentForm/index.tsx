import React from "react"

import { IAppointment } from "#types/IAppointment"

import { TimeSlotTable } from "./TimeSlotTable"

export type IFieldName = "serviceName"

interface IProps {
  availableTimeSlots: IAppointment["timeSlot"][]
  availableServiceNames: string[]
  defaultServiceName: string
  onSubmit(formValues: { serviceName: string; timeSlot: string }): void
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
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<Date | null>(availableTimeSlots[0] || null)

  return (
    <form
      id="appointment"
      onSubmit={(event) => {
        event.preventDefault()
        if (selectedTimeSlot === null) return
        onSubmit({ serviceName: selectedServiceName, timeSlot: selectedTimeSlot.toString() })
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
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        today={today}
      />
      <input type="submit" />
    </form>
  )
}
