import assert from "assert"
import noop from "lodash/noop"
import React from "react"
import ReactDom from "react-dom/client"

import {
  aTimeSlotIn6DaysAt_13_00,
  aTimeSlotInTwoDaysAt_12_00,
  aTimeSlotTodayAt_12_00,
  aTimeSlotTodayAt_13_30,
} from "#sampleData/someTimeSlots"
import { createContainer } from "#utils/testing/createContainer"
import { wait } from "#utils/testing/wait"

import { TimeSlotTable } from "./TimeSlotTable"
import { AppointmentForm } from "./index"

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

  const findStartsAtFieldInput = ({ inputIndex }: { inputIndex: number }) => {
    const anInput = container.querySelectorAll("input[name='startsAt']")[inputIndex]
    assert(anInput instanceof HTMLInputElement, "found element is not an input element")
    return anInput
  }

  it("renders a table for time slots", async () => {
    render(
      <TimeSlotTable
        availableTimeSlots={[]}
        salonOpensAt={12}
        salonClosesAt={14}
        today={new Date()}
        selectedTimeSlot={null}
        setSelectedTimeSlot={noop}
      />
    )
    await wait()
    expect(findTimeSlotTable()).not.toBeNull()
  })

  it("renders a time slot for every half an hour between open and close times", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
        today={new Date()}
      />
    )
    await wait()
    const timesOfDay = findTimeSlotTable().querySelectorAll("tbody >* th")
    expect(timesOfDay).toHaveLength(4)
    expect(timesOfDay[0].textContent).toEqual("12:00")
    expect(timesOfDay[1].textContent).toEqual("12:30")
    expect(timesOfDay[3].textContent).toEqual("13:30")
  })

  it("renders a table cell in quantity of = N timeslots per a day * 7 days", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
        today={new Date()}
      />
    )
    await wait()
    const slotsPerADayAmount = (14 - 12) / 0.5
    const daysAmount = 7
    const cellsAmount = slotsPerADayAmount * daysAmount
    const cells = container.querySelectorAll("td")
    expect(cells).toHaveLength(cellsAmount)
  })

  it("renders an empty cell at the start of the header row", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
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
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
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
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
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
        availableTimeSlots={[aTimeSlotTodayAt_12_00, aTimeSlotTodayAt_13_30]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
        today={new Date()}
      />
    )
    await wait()
    const timesOfDay = findTimeSlotTable().querySelectorAll("input")
    expect(timesOfDay).toHaveLength(2)
  })

  it("sets radio button values to the index of the corresponding appointment", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[aTimeSlotTodayAt_12_00, aTimeSlotTodayAt_13_30]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
        today={new Date()}
      />
    )
    await wait()
    expect(findStartsAtFieldInput({ inputIndex: 0 }).value).toEqual(aTimeSlotTodayAt_12_00.toString())
    expect(findStartsAtFieldInput({ inputIndex: 1 }).value).toEqual(aTimeSlotTodayAt_13_30.toString())
  })

  it("renders a radio button amount that corresponds available time slots amount", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[
          aTimeSlotTodayAt_12_00,
          aTimeSlotTodayAt_13_30,
          aTimeSlotInTwoDaysAt_12_00,
          aTimeSlotIn6DaysAt_13_00,
        ]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
        today={new Date()}
      />
    )
    await wait()
    const radioButtons = container.querySelectorAll('input[type="radio"]')
    expect(radioButtons).toHaveLength(4)
  })

  it("renders a radio button with value of each available time slot", async () => {
    render(
      <AppointmentForm
        availableServiceNames={[]}
        availableTimeSlots={[
          aTimeSlotTodayAt_12_00,
          aTimeSlotTodayAt_13_30,
          aTimeSlotInTwoDaysAt_12_00,
          aTimeSlotIn6DaysAt_13_00,
        ]}
        defaultServiceName=""
        onSubmit={noop}
        salonClosesAt={14}
        salonOpensAt={12}
        today={new Date()}
      />
    )
    await wait()

    expect(container.querySelector(`input[type="radio"][value="${aTimeSlotTodayAt_12_00}"]`)).not.toBeNull()
    expect(container.querySelector(`input[type="radio"][value="${aTimeSlotTodayAt_13_30}"]`)).not.toBeNull()
    expect(container.querySelector(`input[type="radio"][value="${aTimeSlotInTwoDaysAt_12_00}"]`)).not.toBeNull()
    expect(container.querySelector(`input[type="radio"][value="${aTimeSlotIn6DaysAt_13_00}"]`)).not.toBeNull()
  })

  // import ReactDomTestUtils from "react-dom/test-utils"
  // it("submits with a default value if no value was selected", async () => {
  //   render(
  //     <AppointmentForm
  //       availableServiceNames={[]}
  //       availableTimeSlots={[
  //         aTimeSlotTodayAt_12_00,
  //         aTimeSlotTodayAt_13_30,
  //         aTimeSlotInTwoDaysAt_12_00,
  //         aTimeSlotIn6DaysAt_13_00,
  //       ]}
  //       defaultServiceName=""
  //       onSubmit={noop}
  //       salonClosesAt={14}
  //       salonOpensAt={12}
  //       today={new Date()}
  //     />
  //   )
  //   await wait()
  // })
})
