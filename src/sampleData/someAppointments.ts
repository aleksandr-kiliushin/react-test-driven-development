import { IAppointment } from "#types/IAppointment"

import { aCustomer1, aCustomer2 } from "./someCustomers"
import { aTimeSlotTodayAt_12_00, aTimeSlotTomorrowAt_12_00 } from "./someTimeSlots"

export const anAppointment1: IAppointment = {
  customer: aCustomer1,
  notes: "Ducimus numquam aperiam aut sunt enim nihil natus similique ducimus.",
  serviceName: "grief",
  stylistName: "Glenda",
  timeSlot: aTimeSlotTodayAt_12_00,
}

export const anAppointment2: IAppointment = {
  customer: aCustomer2,
  notes: "Corporis autem nulla quos dolor ducimus architecto a mollitia est.",
  serviceName: "preference",
  stylistName: "Olin",
  timeSlot: aTimeSlotTomorrowAt_12_00,
}
