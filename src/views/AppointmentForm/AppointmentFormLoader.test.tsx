import React from "react"
import "whatwg-fetch"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { AppointmentFormLoader } from "./AppointmentFormLoader"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IAppointmentFormLoaderRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("AppointmentFormLoader", () => {
  let render: IAppointmentFormLoaderRenderContainer["render"]

  const today = new Date()
  const availableTimeSlots = [{ startsAt: today.setHours(9, 0, 0, 0) }]
  beforeEach(() => {
    ;({ render } = createContainer())
    // @ts-ignore
    jest.spyOn(window, "fetch").mockReturnValue(createFetchSuccessfulResponse(availableTimeSlots))
  })
  afterEach(() => {
    ;(window.fetch as jest.Mock).mockRestore()
  })

  it("fetches data when component is mounted", () => {
    render(<AppointmentFormLoader />)
    expect(window.fetch).toHaveBeenCalledWith(
      "/availableTimeSlots",
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
    )
  })
})
