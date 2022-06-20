import { noop } from "lodash"
import React from "react"
import "whatwg-fetch"

import { aCustomer1 } from "#sampleData/someCustomers"
import {
  aTimeSlotAtHannaIn6DaysAt_13_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtSuzanTodayAt_12_00,
} from "#sampleData/someTimeSlots"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { AppointmentFormLoader, IAppointmentFormLoaderProps } from "./AppointmentFormLoader"
import * as AppointmentFormExports from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IAppointmentFormLoaderRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

const availableTimeSlots = [
  aTimeSlotAtSuzanTodayAt_12_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtHannaIn6DaysAt_13_00,
]

const availableTimeSlotsServerResponse = availableTimeSlots.map((aTimeSlot) => ({
  startsAt: aTimeSlot.startsAt.toString(),
  stylist: aTimeSlot.stylist,
}))

const appointmentFormLoaderDefaultProps: IAppointmentFormLoaderProps = {
  customer: aCustomer1,
  onSave: noop,
}

describe("AppointmentFormLoader", () => {
  let renderAndWait: IAppointmentFormLoaderRenderContainer["renderAndWait"]

  beforeEach(() => {
    ;({ renderAndWait } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse(availableTimeSlotsServerResponse))
    jest.spyOn(AppointmentFormExports, "AppointmentForm").mockReturnValue(null)
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
    ;(AppointmentFormExports.AppointmentForm as jest.Mock).mockRestore()
  })

  it("fetches data when component is mounted", async () => {
    await renderAndWait(<AppointmentFormLoader {...appointmentFormLoaderDefaultProps} />)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/availableTimeSlots",
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
    )
  })

  it("calls globalThis.fetch just once", async () => {
    await renderAndWait(<AppointmentFormLoader {...appointmentFormLoaderDefaultProps} />)
    await renderAndWait(<AppointmentFormLoader {...appointmentFormLoaderDefaultProps} />)
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })
})
