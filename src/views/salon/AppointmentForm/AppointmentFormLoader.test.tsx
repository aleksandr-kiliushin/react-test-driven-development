import { noop } from "lodash"
import React from "react"

import { aCustomer1 } from "#sampleData/salon/someCustomers"
import {
  aTimeSlotAtHannaIn6DaysAt_13_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtSuzanTodayAt_12_00,
} from "#sampleData/salon/someTimeSlots"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { AppointmentFormLoader, IAppointmentFormLoaderProps } from "./AppointmentFormLoader"
import * as AppointmentFormExports from "./index"

type IAppointmentFormLoaderRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

const availableTimeSlots = [
  aTimeSlotAtSuzanTodayAt_12_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtHannaIn6DaysAt_13_00,
]

const availableTimeSlotsServerResponse = availableTimeSlots.map((aTimeSlot) => ({
  startsAt: aTimeSlot.startsAt,
  stylist: aTimeSlot.stylist,
}))

const appointmentFormLoaderDefaultProps: IAppointmentFormLoaderProps = {
  customer: aCustomer1,
  onAppointmentCreated: noop,
}

describe("AppointmentFormLoader", () => {
  let renderAndWait: IAppointmentFormLoaderRenderContainer["renderAndWait"]

  beforeEach(() => {
    ;({ renderAndWait } = createContainer())
    jest
      .spyOn(globalThis, "fetch")
      .mockReturnValue(createFetchSuccessfulResponse(availableTimeSlotsServerResponse) as Promise<Response>)
    jest.spyOn(AppointmentFormExports, "AppointmentForm").mockReturnValue(null)
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
    ;(AppointmentFormExports.AppointmentForm as jest.Mock).mockRestore()
  })

  it("fetches data when component is mounted", async () => {
    await renderAndWait(<AppointmentFormLoader {...appointmentFormLoaderDefaultProps} />)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/availableTimeSlots",
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
