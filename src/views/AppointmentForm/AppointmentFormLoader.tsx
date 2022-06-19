import { AppointmentForm } from "."
import React from "react"

export const AppointmentFormLoader = () => {
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState([])

  React.useEffect(() => {
    globalThis
      .fetch("/availableTimeSlots", {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
      .then((response) => response.json())
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
