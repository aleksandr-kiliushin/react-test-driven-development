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

  return null
}
