import { flow, uniqBy } from "lodash"

import { IAppointment } from "#types/IAppointment"

const salonOpensAt = 9
const salonClosesAt = 19

export const getARandomTimeSlot = (): IAppointment["timeSlot"] => {
  const aTimeSlot = new Date()
  aTimeSlot.setSeconds(0)
  aTimeSlot.setMilliseconds(0)

  const randomDaysCountToAdd = Math.floor(Math.random() * 7)
  aTimeSlot.setDate(new Date().getDate() + randomDaysCountToAdd)

  const randomHours = salonOpensAt + Math.floor(Math.random() * (salonClosesAt - salonOpensAt))
  aTimeSlot.setHours(randomHours)

  const randomMinutes = Math.random() > 0.5 ? 0 : 30
  aTimeSlot.setMinutes(randomMinutes)

  return aTimeSlot
}

export const getRandomTimeSlots = (): IAppointment["timeSlot"][] => {
  const result = flow(
    (emptySlots: IAppointment["timeSlot"][]) => {
      for (let i = 0; i <= 59; i++) {
        emptySlots.push(getARandomTimeSlot())
      }
      return emptySlots
    },
    (filledSlots) => uniqBy(filledSlots, (aDate) => aDate.valueOf()),
    (uniqueSlots) => uniqueSlots.sort((a, b) => a.valueOf() - b.valueOf())
  )([])

  return result
}
