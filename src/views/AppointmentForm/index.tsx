import React from "react"

import { IAppointment } from "#types/IAppointment"

import { TimeSlotTable } from "./TimeSlotTable"

export type IFieldName = "serviceName" | "stylistName"

interface IAppointmentFormProps {
  availableTimeSlots: IAppointment["timeSlot"][]
  availableServiceNames: string[]
  defaultServiceName: string
  onSubmit(formValues: { serviceName: string; timeSlot: string | null }): void
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

export const AppointmentForm: React.FC<IAppointmentFormProps> = ({
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
        onSubmit({
          serviceName: selectedServiceName,
          timeSlot: selectedTimeSlot === null ? null : selectedTimeSlot.toString(),
        })
      }}
    >
      <div>
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
      </div>
      <div>
        <label htmlFor="stylistName">Stylist</label>
        <select
          id="stylistName"
          name="stylistName"
          onChange={(event) => {
            // setSelectedServiceName(event.target.value)
          }}
          value=""
        >
          {/* {availableServiceNames.map((aServiceName) => (
            <option key={aServiceName}>{aServiceName}</option>
          ))} */}
        </select>
      </div>
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
