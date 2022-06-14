import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import TimeSlotTable from "./TimeSlotTable"
import AppointmentForm from "./index"

describe("time slot table", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  const findTimeSlotTable = (): HTMLTableElement => {
    const table = container.querySelector("table#time-slots")
    assert(table !== null, "Time slots table not found.")
    assert(table instanceof HTMLTableElement, "Found element is not an instance of HTMLTableElement.")
    return table
  }

  it("renders a table for time slots", async () => {
    render(<TimeSlotTable salonOpensAt={9} salonClosesAt={11} />)
    await wait()
    expect(findTimeSlotTable()).not.toBeNull()
  })

  it("renders a time slot for every half an hour between open and close times", async () => {
    render(<AppointmentForm availableServiceNames={[]} defaultServiceName="" salonClosesAt={11} salonOpensAt={9} />)
    await wait()
    const timesOfDay = findTimeSlotTable().querySelectorAll("tbody >* th")
    expect(timesOfDay).toHaveLength(4)
    expect(timesOfDay[0].textContent).toEqual("09:00")
    expect(timesOfDay[1].textContent).toEqual("09:30")
    expect(timesOfDay[3].textContent).toEqual("10:30")
  })

  it("renders an empty cell at the start of the header row", async () => {
    render(<AppointmentForm availableServiceNames={[]} defaultServiceName="" salonClosesAt={11} salonOpensAt={9} />)
    await wait()
    const headerRow = findTimeSlotTable().querySelector("thead > tr")
    assert(headerRow instanceof HTMLTableRowElement)
    assert(headerRow.firstChild instanceof HTMLTableCellElement)

    expect(headerRow.firstChild.tagName).toEqual("TH")
    expect(headerRow.firstChild.textContent).toEqual("")
  })
})
