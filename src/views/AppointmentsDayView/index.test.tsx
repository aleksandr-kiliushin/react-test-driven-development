import assert from "node:assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import { anAppointment1, anAppointment2 } from "#sampleData/someAppointments"
import { IAppointment } from "#types/IAppointment"
import { createContainer } from "#utils/testing/createContainer"
import { wait } from "#utils/testing/wait"

import { AppointmentsDayView } from "./index"

describe("AppointmentsDayView", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  const appointments: IAppointment[] = [anAppointment1, anAppointment2]

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
    expect(appointmentsList.querySelectorAll("li")).toHaveLength(2)
  })

  it("renders multiple `li` with time childrend in an `ol` element.", async () => {
    render(<AppointmentsDayView appointments={appointments} />)
    await wait()
    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    const appointmentsNodes = appointmentsList.querySelectorAll("li")
    expect(appointmentsNodes[0].textContent).toMatch("12:00")
    expect(appointmentsNodes[1].textContent).toMatch("12:00")
  })

  it("renders an empty appointments text when passed an empty appointments array.", async () => {
    render(<AppointmentsDayView appointments={[]} />)
    await wait()
    expect(container.textContent).toMatch("There are no appointments scheduled for today.")
  })

  it("selects the first appointment by default.", async () => {
    render(<AppointmentsDayView appointments={appointments} />)
    await wait()
    expect(container.textContent).toMatch("Roscoe")
  })

  it("has a button element in each li.", async () => {
    render(<AppointmentsDayView appointments={appointments} />)
    await wait()
    const appointmentsList = container.querySelector("ol.appointmentsDayView")
    assert(appointmentsList !== null, "appointmentsList is `null`")
    const buttons = container.querySelectorAll("li > button[type='button']")
    expect(buttons).toHaveLength(2)
  })

  it("renders another appointment when selected", async () => {
    render(<AppointmentsDayView appointments={appointments} />)
    await wait()
    const anotherAppointmentButton = container.querySelectorAll("li > button[type='button']")[1]
    ReactDomTestUtils.Simulate.click(anotherAppointmentButton)
    await wait()
    expect(container.textContent).toMatch("Cara")
  })
})
