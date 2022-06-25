import React from "react"

import { ICustomer } from "#types/ICustomer"
import { ITimeSlot } from "#types/ITimeSlot"

import { AppointmentForm } from "./index"

const today = new Date()

export interface IAppointmentFormLoaderProps {
  customer: ICustomer
  onAppointmentCreated(): void
}

export const AppointmentFormLoader: React.FC<IAppointmentFormLoaderProps> = ({ customer, onAppointmentCreated }) => {
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<ITimeSlot[]>([])

  React.useEffect(() => {
    globalThis
      .fetch("/api/availableTimeSlots", {
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
  }, [])

  return (
    <AppointmentForm
      availableServiceNames={["Blow-dry", "Cut", "Cut & color", "Beard trim", "Extensions"]}
      availableStylists={[
        { name: "Hanna", sertifiedServicesNames: ["Cut", "Cut & color"] },
        { name: "Suzan", sertifiedServicesNames: ["Cut", "Blow-dry"] },
        { name: "George", sertifiedServicesNames: ["Beard trim"] },
        { name: "Rebecca", sertifiedServicesNames: ["Extensions", "Blow-dry"] },
      ]}
      availableTimeSlots={availableTimeSlots}
      defaultServiceName="Cut"
      onAppointmentCreated={onAppointmentCreated}
      salonClosesAt={19}
      salonOpensAt={9}
      today={today}
      customer={customer}
    />
  )
}
