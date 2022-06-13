import assert from "assert"
import React from "react"
import ReactDOM from "react-dom/client"

import { Appointment, AppointmentsDayView } from "./Appointment"

const wait = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}

describe("Appointment", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
  })

  const render = (component: React.ReactElement) => {
    const root = ReactDOM.createRoot(container)
    root.render(component)
  }

  it("renders a customer first name", async () => {
    render(<Appointment customer={{ firstName: "Ashley" }} startsAt={100} />)

    await wait()

    expect(container.textContent).toMatch("Ashley")
  })

  it("renders another customer first name", async () => {
    render(<Appointment customer={{ firstName: "Jordan" }} startsAt={100} />)

    await wait()

    expect(container.textContent).toMatch("Jordan")
  })
})

describe("AppointmentsDayView", () => {
  const today = new Date()
  today.setMinutes(0)
  const appointments = [
    { customer: { firstName: "Ashley" }, startsAt: today.setHours(12) },
    { customer: { firstName: "Jordan" }, startsAt: today.setHours(13) },
  ]

  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
  })

  const render = (component: React.ReactElement) => {
    const root = ReactDOM.createRoot(container)
    root.render(component)
  }

  it("renders a ol with the right className.", async () => {
    render(<AppointmentsDayView appointments={[]} />)

    await wait()

    expect(container.querySelector("ol.appointmentsDayView")).not.toEqual(null)
  })

  it("renders multiple appointments in an `ol` element.", async () => {
    render(<AppointmentsDayView appointments={appointments} />)

    await wait()

    const appointmentsList = container.querySelector("ol.appointmentsDayView")

    assert(appointmentsList !== null, "appointmentsList is `null`")
    expect(appointmentsList.children).toHaveLength(2)
  })

  it("renders multiple `li` with time childrend in an `ol` element.", async () => {
    render(<AppointmentsDayView appointments={appointments} />)

    await wait()

    const appointmentsList = container.querySelector("ol.appointmentsDayView")

    assert(appointmentsList !== null, "appointmentsList is `null`")
    expect(appointmentsList.children).toHaveLength(2)

    const appointmentsNodes = appointmentsList.querySelectorAll("li")
    expect(appointmentsNodes[0].textContent).toMatch("12:00")
    expect(appointmentsNodes[1].textContent).toMatch("13:00")
  })

  it("renders a ol with the right className.", async () => {
    render(<AppointmentsDayView appointments={[]} />)

    await wait()

    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    expect(appointmentsList.textContent).toMatch("There are no appointments scheduled for today.")
  })

  it("selects the first appointment by default.", async () => {
    render(<AppointmentsDayView appointments={appointments} />)

    await wait()

    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    expect(appointmentsList.textContent).toMatch("Ashley")
  })
})
