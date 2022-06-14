import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import Appointment from "./Appointment"
import { appointment1, appointment2 } from "./sampleData"

describe("Appointment", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  it("renders an appointment heading", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()

    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 09:00`)
  })

  it("renders an appointment heading", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()

    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 10:00`)
  })

  it("renders a customer name", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(
      `Customer name: ${appointment1.customer.firstName} ${appointment1.customer.lastName}`
    )
  })

  it("renders another customer name", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(
      `Customer name: ${appointment2.customer.firstName} ${appointment2.customer.lastName}`
    )
  })

  it("renders a customer phone number", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(`Customer phone: ${appointment1.customer.phoneNumber}`)
  })

  it("renders another customer phone number", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(`Customer phone: ${appointment2.customer.phoneNumber}`)
  })

  it("renders a service name", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(`Service: ${appointment1.serviceName}`)
  })

  it("renders another appointment service name", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(`Service: ${appointment2.serviceName}`)
  })

  it("renders an appointment notes", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(`Notes: ${appointment1.notes}`)
  })

  it("renders another appointment notes", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(`Notes: ${appointment2.notes}`)
  })
})
