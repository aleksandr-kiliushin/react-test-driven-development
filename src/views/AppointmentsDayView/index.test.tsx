import React from "react"

import { anAppointment1, anAppointment2 } from "#sampleData/someAppointments"
import { IAppointment } from "#types/IAppointment"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { AppointmentsDayView } from "./index"

type IAppointmentsDayViewFormRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("AppointmentsDayView", () => {
  let container: IAppointmentsDayViewFormRenderContainer["container"]
  let findElement: IAppointmentsDayViewFormRenderContainer["findElement"]
  let findElements: IAppointmentsDayViewFormRenderContainer["findElements"]
  let render: IAppointmentsDayViewFormRenderContainer["render"]
  let simulateClick: IAppointmentsDayViewFormRenderContainer["simulateClick"]

  beforeEach(() => {
    ;({ container, findElement, findElements, render, simulateClick } = createContainer())
  })

  const appointments: IAppointment[] = [anAppointment1, anAppointment2]

  it("renders a ol with the right className.", () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(findElement("ol.appointmentsDayView")).not.toBeNull()
  })

  it("renders multiple appointments in an `ol` element.", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(findElements("li")).toHaveLength(2)
  })

  it("renders multiple `li` with time childrend in an `ol` element.", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    const appointmentsNodes = findElements("li")
    expect(appointmentsNodes[0].textContent).toMatch("12:00")
    expect(appointmentsNodes[1].textContent).toMatch("12:00")
  })

  it("renders an empty appointments text when passed an empty appointments array.", () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.textContent).toMatch("There are no appointments scheduled for today.")
  })

  it("selects the first appointment by default.", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.textContent).toMatch("Roscoe")
  })

  it("has a button element in each li.", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    const buttons = findElements("li > button[type='button']")
    expect(buttons).toHaveLength(2)
  })

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={appointments} />)
    const anotherAppointmentButton = findElements("li > button[type='button']")[1]
    simulateClick(anotherAppointmentButton)
    expect(container.textContent).toMatch("Cara")
  })
})
