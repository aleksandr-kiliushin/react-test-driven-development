import assert from "node:assert"
import React from "react"
import ReactDom from "react-dom/client"
import { act } from "react-dom/test-utils"

import { anAppointment1, anAppointment2 } from "#sampleData/someAppointments"
import { createContainer } from "#utils/testing/createContainer"

import { Appointment } from "./Appointment"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

describe("Appointment", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  it("renders an appointment heading", () => {
    act(() => {
      render(<Appointment appointment={anAppointment1} />)
    })
    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 12:00`)
  })

  it("renders an appointment heading", () => {
    act(() => {
      render(<Appointment appointment={anAppointment2} />)
    })
    const appointmentHeading = container.querySelector("h2")
    assert(appointmentHeading !== null, "appointmentHeading should not be null")
    expect(appointmentHeading.textContent).toMatch(`Todays appointment at 12:00`)
  })

  it("renders a customer name", () => {
    act(() => {
      render(<Appointment appointment={anAppointment1} />)
    })
    expect(container.textContent).toMatch(
      `Customer name: ${anAppointment1.customer.firstName} ${anAppointment1.customer.lastName}`
    )
  })

  it("renders another customer name", () => {
    act(() => {
      render(<Appointment appointment={anAppointment2} />)
    })
    expect(container.textContent).toMatch(
      `Customer name: ${anAppointment2.customer.firstName} ${anAppointment2.customer.lastName}`
    )
  })

  it("renders a customer phone number", () => {
    act(() => {
      render(<Appointment appointment={anAppointment1} />)
    })
    expect(container.textContent).toMatch(`Customer phone: ${anAppointment1.customer.phoneNumber}`)
  })

  it("renders another customer phone number", () => {
    act(() => {
      render(<Appointment appointment={anAppointment2} />)
    })
    expect(container.textContent).toMatch(`Customer phone: ${anAppointment2.customer.phoneNumber}`)
  })

  it("renders a service name", () => {
    act(() => {
      render(<Appointment appointment={anAppointment1} />)
    })
    expect(container.textContent).toMatch(`Service: ${anAppointment1.serviceName}`)
  })

  it("renders another appointment service name", () => {
    act(() => {
      render(<Appointment appointment={anAppointment2} />)
    })
    expect(container.textContent).toMatch(`Service: ${anAppointment2.serviceName}`)
  })

  it("renders an appointment notes", () => {
    act(() => {
      render(<Appointment appointment={anAppointment1} />)
    })
    expect(container.textContent).toMatch(`Notes: ${anAppointment1.notes}`)
  })

  it("renders another appointment notes", () => {
    act(() => {
      render(<Appointment appointment={anAppointment2} />)
    })
    expect(container.textContent).toMatch(`Notes: ${anAppointment2.notes}`)
  })
})
