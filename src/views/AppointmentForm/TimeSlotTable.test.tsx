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
    render(<TimeSlotTable availableTimeSlots={[]} salonOpensAt={9} salonClosesAt={11} today={new Date()} />)
    await wait()
    expect(findTimeSlotTable()).not.toBeNull()
  })

  it("renders a time slot for every half an hour between open and close times", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={() => {}}
        salonClosesAt={11}
        salonOpensAt={9}
        today={new Date()}
      />
    )
    await wait()
    const timesOfDay = findTimeSlotTable().querySelectorAll("tbody >* th")
    expect(timesOfDay).toHaveLength(4)
    expect(timesOfDay[0].textContent).toEqual("09:00")
    expect(timesOfDay[1].textContent).toEqual("09:30")
    expect(timesOfDay[3].textContent).toEqual("10:30")
  })

  it("renders an empty cell at the start of the header row", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={() => {}}
        salonClosesAt={11}
        salonOpensAt={9}
        today={new Date()}
      />
    )
    await wait()
    const headerRow = findTimeSlotTable().querySelector("thead > tr")
    assert(headerRow instanceof HTMLTableRowElement)
    assert(headerRow.firstChild instanceof HTMLTableCellElement)

    expect(headerRow.firstChild.tagName).toEqual("TH")
    expect(headerRow.firstChild.textContent).toEqual("")
  })

  it("renders a week of available dates", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={() => {}}
        salonClosesAt={11}
        salonOpensAt={9}
        today={new Date(2018, 11, 1)}
      />
    )
    await wait()
    const dates = findTimeSlotTable().querySelectorAll("thead >* th:not(:first-child)")
    expect(dates).toHaveLength(7)
    expect(dates[0].textContent).toEqual("Sat 01")
    expect(dates[1].textContent).toEqual("Sun 02")
    expect(dates[6].textContent).toEqual("Fri 07")
  })

  it("does not render radio buttons when availableDates is empty", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={() => {}}
        salonClosesAt={11}
        salonOpensAt={9}
        today={new Date()}
      />
    )
    await wait()
    const timesOfDay = findTimeSlotTable().querySelectorAll("input")
    expect(timesOfDay).toHaveLength(0)
  })

  it("does not render radio buttons for unavailable time slots", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[
          { startsAt: new Date().setHours(9, 0, 0, 0) },
          { startsAt: new Date().setHours(9, 30, 0, 0) },
        ]}
        defaultServiceName=""
        onSubmit={() => {}}
        salonClosesAt={11}
        salonOpensAt={9}
        today={new Date()}
      />
    )
    await wait()
    const timesOfDay = findTimeSlotTable().querySelectorAll("input")
    expect(timesOfDay).toHaveLength(2)
  })
})
