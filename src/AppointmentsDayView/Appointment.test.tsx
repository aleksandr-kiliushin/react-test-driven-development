import assert from "assert"
import React from "react"

import createContainer from "#utils/testing/createContainer"

import Appointment from "./Appointment"
import { appointment1, appointment2 } from "./sampleData"

const wait = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}

describe("Appointment", () => {
  it("renders an appointment heading", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment1} />)
    await wait()

    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 09:00`)
  })

  it("renders an appointment heading", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment2} />)
    await wait()

    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 10:00`)
  })

  it("renders a customer name", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(
      `Customer name: ${appointment1.customer.firstName} ${appointment1.customer.lastName}`
    )
  })

  it("renders another customer name", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(
      `Customer name: ${appointment2.customer.firstName} ${appointment2.customer.lastName}`
    )
  })

  it("renders a customer phone number", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(`Customer phone: ${appointment1.customer.phoneNumber}`)
  })

  it("renders another customer phone number", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(`Customer phone: ${appointment2.customer.phoneNumber}`)
  })

  it("renders a service name", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(`Service: ${appointment1.serviceName}`)
  })

  it("renders another appointment service name", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(`Service: ${appointment2.serviceName}`)
  })

  it("renders an appointment notes", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment1} />)
    await wait()

    expect(container.textContent).toMatch(`Notes: ${appointment1.notes}`)
  })

  it("renders another appointment notes", async () => {
    const { container, render } = createContainer()

    render(<Appointment appointment={appointment2} />)
    await wait()

    expect(container.textContent).toMatch(`Notes: ${appointment2.notes}`)
  })
})
