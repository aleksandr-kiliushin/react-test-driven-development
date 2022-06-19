import assert from "node:assert"
import React from "react"

import { anAppointment1, anAppointment2 } from "#sampleData/someAppointments"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { Appointment } from "./Appointment"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IAppointmentRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("Appointment", () => {
  let container: IAppointmentRenderContainer["container"]
  let render: IAppointmentRenderContainer["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  it("renders an appointment heading", () => {
    render(<Appointment appointment={anAppointment1} />)
    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 12:00`)
  })

  it("renders an appointment heading", () => {
    render(<Appointment appointment={anAppointment2} />)
    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 12:00`)
  })

  it("renders a customer name", () => {
    render(<Appointment appointment={anAppointment1} />)
    expect(container.textContent).toMatch(
      `Customer name: ${anAppointment1.customer.firstName} ${anAppointment1.customer.lastName}`
    )
  })

  it("renders another customer name", () => {
    render(<Appointment appointment={anAppointment2} />)
    expect(container.textContent).toMatch(
      `Customer name: ${anAppointment2.customer.firstName} ${anAppointment2.customer.lastName}`
    )
  })

  it("renders a customer phone number", () => {
    render(<Appointment appointment={anAppointment1} />)
    expect(container.textContent).toMatch(`Customer phone: ${anAppointment1.customer.phoneNumber}`)
  })

  it("renders another customer phone number", () => {
    render(<Appointment appointment={anAppointment2} />)
    expect(container.textContent).toMatch(`Customer phone: ${anAppointment2.customer.phoneNumber}`)
  })

  it("renders a service name", () => {
    render(<Appointment appointment={anAppointment1} />)
    expect(container.textContent).toMatch(`Service: ${anAppointment1.serviceName}`)
  })

  it("renders another appointment service name", () => {
    render(<Appointment appointment={anAppointment2} />)
    expect(container.textContent).toMatch(`Service: ${anAppointment2.serviceName}`)
  })

  it("renders an appointment notes", () => {
    render(<Appointment appointment={anAppointment1} />)
    expect(container.textContent).toMatch(`Notes: ${anAppointment1.notes}`)
  })

  it("renders another appointment notes", () => {
    render(<Appointment appointment={anAppointment2} />)
    expect(container.textContent).toMatch(`Notes: ${anAppointment2.notes}`)
  })
})
