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
    render(<Appointment customer={{ firstName: "Ashley" }} />)

    await wait()

    expect(container.textContent).toMatch("Ashley")
  })

  it("renders another customer first name", async () => {
    render(<Appointment customer={{ firstName: "Jordan" }} />)

    await wait()

    expect(container.textContent).toMatch("Jordan")
  })
})

describe("AppointmentsDayView", () => {
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
    const today = new Date()

    render(
      <AppointmentsDayView
        appointments={[
          {
            startsAt: today.setHours(12),
          },
          {
            startsAt: today.setHours(13),
          },
        ]}
      />
    )

    await wait()

    expect(container.querySelector("ol.appointmentsDayView")).not.toEqual(null)

    expect(container.querySelector("ol.appointmentsDayView")?.children).toHaveLength(2)
  })
})
