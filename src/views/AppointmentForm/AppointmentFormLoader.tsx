import React from "react"

import { aTimeSlotAtHannaIn6DaysAt_13_00, aTimeSlotAtHannaTodayAt_13_30 } from "#sampleData/someTimeSlots"
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
  }, [])

  return (
    <AppointmentForm
      availableServiceNames={["Blow-dry", "Cut"]}
      availableStylists={[aTimeSlotAtHannaIn6DaysAt_13_00.stylist, aTimeSlotAtHannaTodayAt_13_30.stylist]}
      availableTimeSlots={availableTimeSlots}
      defaultServiceName="Cut"
      onSubmit={onSave}
      salonClosesAt={9}
      salonOpensAt={19}
      today={today}
      customer={customer}
    />
  )
}
