import React from "react"

import { IAppointment } from "#types/IAppointment"
import { IStylist } from "#types/IStylist"

import { TimeSlotTable } from "./TimeSlotTable"

export type IFieldName = "serviceName" | "stylistName" | "timeSlot"

export interface IAppointmentFormProps {
  availableServiceNames: string[]
  availableStylists: IStylist[]
  availableTimeSlots: IAppointment["timeSlot"][]
  defaultServiceName: string
  onSubmit(formValues: {
    serviceName: string
    stylistName: IAppointment["stylistName"] | undefined
    timeSlot: IAppointment["stylistName"] | null
  }): void
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

export const AppointmentForm: React.FC<IAppointmentFormProps> = ({
  availableServiceNames,
  availableStylists,
  availableTimeSlots,
  defaultServiceName,
  onSubmit,
  salonClosesAt,
  salonOpensAt,
  today,
}) => {
  const [selectedServiceName, setSelectedServiceName] = React.useState<string>(defaultServiceName)
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<Date | null>(availableTimeSlots[0] || null)
  const [selectedStylistName, setSelectedStylistName] = React.useState<IStylist["name"] | "Not selected">(
    "Not selected"
  )

  return (
    <form
      id="appointment"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          serviceName: selectedServiceName,
          stylistName: selectedStylistName,
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
            setSelectedStylistName(event.target.value)
          }}
          value={selectedStylistName}
        >
          <option>Not selected</option>
          {availableStylists
            .filter((aStylist) => aStylist.sertifiedServicesNames.includes(selectedServiceName))
            .map((aStylist) => (
              <option key={aStylist.name}>{aStylist.name}</option>
            ))}
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
