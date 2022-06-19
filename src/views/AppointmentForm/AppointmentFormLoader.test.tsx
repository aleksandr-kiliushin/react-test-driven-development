import React from "react"
import "whatwg-fetch"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { AppointmentFormLoader } from "./AppointmentFormLoader"
import * as AppointmentFormExports from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IAppointmentFormLoaderRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

const today = new Date()
const availableTimeSlots = [{ startsAt: today.setHours(9, 0, 0, 0) }]

describe("AppointmentFormLoader", () => {
  let render: IAppointmentFormLoaderRenderContainer["render"]

  beforeEach(() => {
    ;({ render } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse(availableTimeSlots))
    jest.spyOn(AppointmentFormExports, "AppointmentForm").mockReturnValue(null)
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
    ;(AppointmentFormExports.AppointmentForm as jest.Mock).mockRestore()
  })

  it("fetches data when component is mounted", () => {
    render(<AppointmentFormLoader />)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/availableTimeSlots",
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
    )
  })

  it("initially passes no data to AppointmentForm", () => {
    render(<AppointmentFormLoader />)
    expect(AppointmentFormExports.AppointmentForm).toHaveBeenCalledWith({ availableTimeSlots: [] }, expect.anything())
  })
})
