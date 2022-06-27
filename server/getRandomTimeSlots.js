const { sample, sampleSize, uniqBy } = require("lodash")

const getARandomStylist = () => {
  return {
    name: sample(["Hanna", "Suzan", "George", "John", "Rebecca"]),
    sertifiedServicesNames: sampleSize(
      ["Cut", "Blow-dry", "Cut & color", "Beard trim", "Cut & beard trim", "Extensions"],
      3
    ),
  }
}

const salonOpensAt = 9
const salonClosesAt = 19

const getARandomTimeSlot = () => {
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

const getRandomTimeSlots = () => {
  const slots = []

  for (let i = 0; i <= 99; i++) {
    slots.push(getARandomTimeSlot())
  }

  return uniqBy(slots, (aSlot) => aSlot.startsAt.toString() + aSlot.stylist.name)
}

module.exports = { getRandomTimeSlots }
