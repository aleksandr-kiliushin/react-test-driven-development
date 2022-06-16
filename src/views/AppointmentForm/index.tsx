import React from "react"

import { IStylist } from "#types/IStylist"
import { ITimeSlot } from "#types/ITimeSlot"

import { TimeSlotTable } from "./TimeSlotTable"

export type IFieldName = "serviceName" | "stylistName" | "timeSlot"

export interface IAppointmentFormProps {
  availableServiceNames: string[]
  availableStylists: IStylist[]
  availableTimeSlots: ITimeSlot[]
  defaultServiceName: string
  onSubmit(formValues: {
    serviceName: string
    startsAtDate: ITimeSlot["startsAt"] | undefined
    stylistName: IStylist["name"] | "Not selected"
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
  const [selectedStartsAtDate, setSelectedStartsAtDate] = React.useState<ITimeSlot["startsAt"] | undefined>(undefined)
  const [selectedStylistName, setSelectedStylistName] = React.useState<IStylist["name"] | "Not selected">(
    "Not selected"
  )

  const availableTimeSlotsForSelectedStylistName = React.useMemo<ITimeSlot[]>(() => {
    if (selectedStylistName === "Not selected") return []
    return availableTimeSlots.filter((aTimeSlot) => aTimeSlot.stylist.name === selectedStylistName)
  }, [availableTimeSlots, selectedStylistName])

  return (
    <form
      id="appointment"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          serviceName: selectedServiceName,
          stylistName: selectedStylistName,
          startsAtDate: selectedStartsAtDate,
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
        availableTimeSlotsForSelectedStylistName={availableTimeSlotsForSelectedStylistName}
        salonClosesAt={salonClosesAt}
        salonOpensAt={salonOpensAt}
        selectedStartsAtDate={selectedStartsAtDate}
        setSelectedStartsAtDate={setSelectedStartsAtDate}
        today={today}
      />
      <input type="submit" />
    </form>
  )
}
