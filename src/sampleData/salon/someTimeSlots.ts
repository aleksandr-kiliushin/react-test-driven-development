import { ITimeSlot } from "#types/salon/ITimeSlot"

const date1 = new Date()
date1.setHours(12)
date1.setMinutes(0)
date1.setSeconds(0)
date1.setMilliseconds(0)
const aTimeSlotAtSuzanTodayAt_12_00: ITimeSlot = {
  startsAt: date1.toISOString(),
  stylist: {
    name: "Suzan",
    sertifiedServicesNames: ["Cut", "Blow-dry"],
  },
}

const date2 = new Date()
date2.setHours(13)
date2.setMinutes(30)
date2.setSeconds(0)
date2.setMilliseconds(0)
const aTimeSlotAtHannaTodayAt_13_30: ITimeSlot = {
  startsAt: date2.toISOString(),
  stylist: {
    name: "Hanna",
    sertifiedServicesNames: ["Cut"],
  },
}

const date3 = new Date()
date3.setDate(new Date().getDate() + 3)
date3.setHours(12)
date3.setMinutes(0)
date3.setSeconds(0)
date3.setMilliseconds(0)
const aTimeSlotAtSuzanInTwoDaysAt_12_00: ITimeSlot = {
  startsAt: date3.toISOString(),
  stylist: {
    name: "Suzan",
    sertifiedServicesNames: ["Cut", "Blow-dry"],
  },
}

const date4 = new Date()
date4.setDate(new Date().getDate() + 6)
date4.setHours(13)
date4.setMinutes(0)
date4.setSeconds(0)
date4.setMilliseconds(0)
const aTimeSlotAtHannaIn6DaysAt_13_00: ITimeSlot = {
  startsAt: date4.toISOString(),
  stylist: {
    name: "Hanna",
    sertifiedServicesNames: ["Cut"],
  },
}

export {
  aTimeSlotAtSuzanTodayAt_12_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtHannaIn6DaysAt_13_00,
}
