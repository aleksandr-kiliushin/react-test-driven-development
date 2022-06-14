import React from "react"
import ReactDom from "react-dom/client"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import TimeSlotTable from "./TimeSlotTable"

describe("time slot table", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  it("renders a table for time slots", async () => {
    render(<TimeSlotTable />)
    await wait()
    expect(container.querySelector("table#time-slots")).not.toBeNull()
  })
})
