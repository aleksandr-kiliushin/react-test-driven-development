import React from "react"

import { ITimeSlot } from "#types/ITimeSlot"

import { AppointmentForm } from "./index"

export const AppointmentFormLoader: React.FC = () => {
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
    // @ts-ignore
    <AppointmentForm
      // availableServiceNames={[]}
      // availableStylists={[]}
      availableTimeSlots={availableTimeSlots}
      // defaultServiceName={""}
      // onSubmit={function (formValues: {
      //   serviceName: string
      //   startsAtDate: Date | undefined
      //   stylistName: string
      // }): void {
      //   throw new Error("Function not implemented.")
      // }}
      // salonClosesAt={0}
      // salonOpensAt={0}
      // today={new Date()}
    />
  )
}
