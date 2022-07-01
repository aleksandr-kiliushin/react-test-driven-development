import { IAppointment } from "#types/salon/IAppointment"

import { aCustomer1, aCustomer2 } from "./someCustomers"
import { aTimeSlotAtSuzanInTwoDaysAt_12_00, aTimeSlotAtSuzanTodayAt_12_00 } from "./someTimeSlots"

export const anAppointment1: IAppointment = {
  customer: aCustomer1,
  notes: "Ducimus numquam aperiam aut sunt enim nihil natus similique ducimus.",
  serviceName: "Cut",
  timeSlot: aTimeSlotAtSuzanTodayAt_12_00,
}

export const anAppointment2: IAppointment = {
  customer: aCustomer2,
  notes: "Corporis autem nulla quos dolor ducimus architecto a mollitia est.",
  serviceName: "Blow-dry",
  timeSlot: aTimeSlotAtSuzanInTwoDaysAt_12_00,
}
