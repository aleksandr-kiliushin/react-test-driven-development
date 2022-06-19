import { AppointmentForm } from "."
import React from "react"

export const AppointmentFormLoader = () => {
  React.useEffect(() => {
    const fetchAvailableTimeSlots = () => {
      globalThis.fetch("/availableTimeSlots", {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
    }
    fetchAvailableTimeSlots()
  }, [])

  return (
    // @ts-ignore
    <AppointmentForm
      // availableServiceNames={[]}
      // availableStylists={[]}
      availableTimeSlots={[]}
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
