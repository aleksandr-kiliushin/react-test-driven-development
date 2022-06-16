import { uniqBy } from "lodash"

import { ITimeSlot } from "#types/ITimeSlot"

import { getARandomStylist } from "./getRandomStylists"

const salonOpensAt = 9
const salonClosesAt = 19

export const getARandomTimeSlot = (): ITimeSlot => {
  const timeSlotStartsAt = new Date()
  timeSlotStartsAt.setSeconds(0)
  timeSlotStartsAt.setMilliseconds(0)

  const randomDaysCountToAdd = Math.floor(Math.random() * 7)
  timeSlotStartsAt.setDate(new Date().getDate() + randomDaysCountToAdd)

  const randomHours = salonOpensAt + Math.floor(Math.random() * (salonClosesAt - salonOpensAt))
  timeSlotStartsAt.setHours(randomHours)

  const randomMinutes = Math.random() > 0.5 ? 0 : 30
  timeSlotStartsAt.setMinutes(randomMinutes)

  return {
    startsAt: timeSlotStartsAt,
    stylist: getARandomStylist(),
  }
}

export const getRandomTimeSlots = (): ITimeSlot[] => {
  const slots = []

  for (let i = 0; i <= 99; i++) {
    slots.push(getARandomTimeSlot())
  }

  return uniqBy(slots, (aSlot) => aSlot.startsAt.toString() + aSlot.stylist.name)
}
