import React from "react"

import { ICustomer } from "#types/ICustomer"
import { ITimeSlot } from "#types/ITimeSlot"

import { AppointmentForm } from "./index"

const today = new Date()

export interface IAppointmentFormLoaderProps {
  customer: ICustomer
  onSave(): void
}

export const AppointmentFormLoader: React.FC<IAppointmentFormLoaderProps> = ({ customer, onSave }) => {
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<ITimeSlot[]>([])

  React.useEffect(() => {
    globalThis
      .fetch("/availableTimeSlots", {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
      .then((response) => response.json())
      .then((availableTimeSlots) => {
        return availableTimeSlots.map((aTimeSlot: { startsAt: string; stylist: ITimeSlot["stylist"] }) => ({
          startsAt: new Date(aTimeSlot.startsAt.toString()),
          stylist: aTimeSlot.stylist,
        }))
      })
      .then(setAvailableTimeSlots)
    // setAvailableTimeSlots(getRandomTimeSlots())
  }, [])

  return (
    <AppointmentForm
      availableServiceNames={["Blow-dry", "Cut"]}
      availableStylists={[
        { name: "Hanna", sertifiedServicesNames: ["Cut"] },
        { name: "Suzan", sertifiedServicesNames: ["Cut", "Blow-dry"] },
      ]}
      availableTimeSlots={availableTimeSlots}
      defaultServiceName="Cut"
      onSubmit={onSave}
      salonClosesAt={19}
      salonOpensAt={9}
      today={today}
      customer={customer}
    />
  )
}
