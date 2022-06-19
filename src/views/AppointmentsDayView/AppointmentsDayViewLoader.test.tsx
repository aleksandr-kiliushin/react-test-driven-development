import React from "react"
import "whatwg-fetch"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { AppointmentsDayViewLoader } from "./AppointmentsDayViewLoader"
import * as AppointmentsDayViewExports from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IAppointmentsDayViewLoaderRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

const today = new Date()
const appointments = [{ startsAt: today.setHours(9, 0, 0, 0) }, { startsAt: today.setHours(10, 0, 0, 0) }]

describe("AppointmentsDayViewLoader", () => {
  let renderAndWait: IAppointmentsDayViewLoaderRenderContainer["renderAndWait"]

  beforeEach(() => {
    ;({ renderAndWait } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse(appointments))
    jest.spyOn(AppointmentsDayViewExports, "AppointmentsDayView").mockReturnValue(null)
  })
  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
    ;(AppointmentsDayViewExports.AppointmentsDayView as jest.Mock).mockRestore()
  })

  it("fetches appointments happening today when component is mounted", async () => {
    const from = today.setHours(0, 0, 0, 0)
    const to = today.setHours(23, 59, 59, 999)
    await renderAndWait(<AppointmentsDayViewLoader today={today} />)
    expect(window.fetch).toHaveBeenCalledWith(
      `/appointments/${from}-${to}`,
      expect.objectContaining({
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
    )
  })
})
