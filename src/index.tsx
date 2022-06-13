import React from "react"
import ReactDOM from "react-dom/client"

import { AppointmentsDayView } from "./AppointmentsDayView"
import { sampleAppointments } from "./AppointmentsDayView/sampleData"

let container = document.querySelector("#root")
if (container === null) {
  container = document.createElement("div")
  container.setAttribute("id", "root")
  document.body.append(container)
}

const root = ReactDOM.createRoot(container)
root.render(<AppointmentsDayView appointments={sampleAppointments} />)
