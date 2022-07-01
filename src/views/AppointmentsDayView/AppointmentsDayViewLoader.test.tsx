import React from "react"

import { aCustomer1, aCustomer2 } from "#sampleData/someCustomers"
import { aTimeSlotAtHannaTodayAt_13_30, aTimeSlotAtSuzanTodayAt_12_00 } from "#sampleData/someTimeSlots"
import { IAppointment } from "#types/IAppointment"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { AppointmentsDayViewLoader } from "./AppointmentsDayViewLoader"
import * as AppointmentsDayViewExports from "./index"

type IAppointmentsDayViewLoaderRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

const today = new Date()
const from = today.setHours(0, 0, 0, 0)
const to = today.setHours(23, 59, 59, 999)

const appointments: IAppointment[] = [
  {
    customer: aCustomer1,
    notes: "Some notes 123123123",
    serviceName: "Cut",
    timeSlot: aTimeSlotAtSuzanTodayAt_12_00,
  },
  {
    customer: aCustomer2,
    notes: "Some notes 989485495843",
    serviceName: "Blow-dry",
    timeSlot: aTimeSlotAtHannaTodayAt_13_30,
  },
]

const appointmentsServerResponse = appointments.map((anAppointment) => ({
  ...anAppointment,
  timeSlot: {
    ...anAppointment.timeSlot,
    startsAt: anAppointment.timeSlot.startsAt,
  },
}))

describe("AppointmentsDayViewLoader", () => {
  let renderAndWait: IAppointmentsDayViewLoaderRenderContainer["renderAndWait"]

  beforeEach(() => {
    ;({ renderAndWait } = createContainer())
    jest
      .spyOn(globalThis, "fetch")
      .mockReturnValue(createFetchSuccessfulResponse(appointmentsServerResponse) as Promise<Response>)
    jest.spyOn(AppointmentsDayViewExports, "AppointmentsDayView").mockReturnValue(null)
  })
  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
    ;(AppointmentsDayViewExports.AppointmentsDayView as jest.Mock).mockRestore()
  })

  it("fetches appointments happening today when component is mounted", async () => {
    await renderAndWait(<AppointmentsDayViewLoader today={today} />)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `/api/appointments/${from}-${to}`,
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
    )
  })

  it("initially passes no data to AppointmentsDayView", async () => {
    await renderAndWait(<AppointmentsDayViewLoader today={today} />)
    expect(AppointmentsDayViewExports.AppointmentsDayView).toHaveBeenCalledWith({ appointments: [] }, expect.anything())
  })

  it("re-requests appointment when today prop changes", async () => {
    const tomorrow = new Date(today)
    tomorrow.setHours(24)
    const from = tomorrow.setHours(0, 0, 0, 0)
    const to = tomorrow.setHours(23, 59, 59, 999)
    await renderAndWait(<AppointmentsDayViewLoader today={today} />)
    await renderAndWait(<AppointmentsDayViewLoader today={tomorrow} />)
    expect(globalThis.fetch).toHaveBeenLastCalledWith(`/api/appointments/${from}-${to}`, expect.anything())
  })

  it("calls globalThis.fetch just once", async () => {
    await renderAndWait(<AppointmentsDayViewLoader today={today} />)
    await renderAndWait(<AppointmentsDayViewLoader today={today} />)
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })
})
