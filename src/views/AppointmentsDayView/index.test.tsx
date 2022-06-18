import assert from "node:assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils, { act } from "react-dom/test-utils"

import { anAppointment1, anAppointment2 } from "#sampleData/someAppointments"
import { IAppointment } from "#types/IAppointment"
import { createContainer } from "#utils/testing/createContainer"

import { AppointmentsDayView } from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

describe("AppointmentsDayView", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  const appointments: IAppointment[] = [anAppointment1, anAppointment2]

  it("renders a ol with the right className.", () => {
    act(() => {
      render(<AppointmentsDayView appointments={[]} />)
    })
    expect(container.querySelector("ol.appointmentsDayView")).not.toEqual(null)
  })

  it("renders multiple appointments in an `ol` element.", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />)
    })
    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    expect(appointmentsList.querySelectorAll("li")).toHaveLength(2)
  })

  it("renders multiple `li` with time childrend in an `ol` element.", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />)
    })
    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    const appointmentsNodes = appointmentsList.querySelectorAll("li")
    expect(appointmentsNodes[0].textContent).toMatch("12:00")
    expect(appointmentsNodes[1].textContent).toMatch("12:00")
  })

  it("renders an empty appointments text when passed an empty appointments array.", () => {
    act(() => {
      render(<AppointmentsDayView appointments={[]} />)
    })
    expect(container.textContent).toMatch("There are no appointments scheduled for today.")
  })

  it("selects the first appointment by default.", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />)
    })
    expect(container.textContent).toMatch("Roscoe")
  })

  it("has a button element in each li.", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />)
    })
    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    const buttons = container.querySelectorAll("li > button[type='button']")
    expect(buttons).toHaveLength(2)
  })

  it("renders another appointment when selected", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />)
    })
    const anotherAppointmentButton = container.querySelectorAll("li > button[type='button']")[1]
    act(() => {
      ReactDomTestUtils.Simulate.click(anotherAppointmentButton)
    })
    expect(container.textContent).toMatch("Cara")
  })
})
