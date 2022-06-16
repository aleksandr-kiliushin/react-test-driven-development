import { ITimeSlot } from "#types/ITimeSlot"

const aTimeSlotAtSuzanTodayAt_12_00: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Suzan",
    sertifiedServicesNames: ["Cut", "Blow-dry"],
  },
}
aTimeSlotAtSuzanTodayAt_12_00.startsAt.setHours(12)
aTimeSlotAtSuzanTodayAt_12_00.startsAt.setMinutes(0)
aTimeSlotAtSuzanTodayAt_12_00.startsAt.setSeconds(0)
aTimeSlotAtSuzanTodayAt_12_00.startsAt.setMilliseconds(0)

const aTimeSlotAtHannaTodayAt_13_30: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Hanna",
    sertifiedServicesNames: ["Cut"],
  },
}
aTimeSlotAtHannaTodayAt_13_30.startsAt.setHours(13)
aTimeSlotAtHannaTodayAt_13_30.startsAt.setMinutes(30)
aTimeSlotAtHannaTodayAt_13_30.startsAt.setSeconds(0)
aTimeSlotAtHannaTodayAt_13_30.startsAt.setMilliseconds(0)

const aTimeSlotAtSuzanInTwoDaysAt_12_00: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Suzan",
    sertifiedServicesNames: ["Cut", "Blow-dry"],
  },
}
aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.setDate(new Date().getDate() + 3)
aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.setHours(12)
aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.setMinutes(0)
aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.setSeconds(0)
aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.setMilliseconds(0)

const aTimeSlotAtHannaIn6DaysAt_13_00: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Hanna",
    sertifiedServicesNames: ["Cut"],
  },
}
aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.setDate(new Date().getDate() + 6)
aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.setHours(13)
aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.setMinutes(0)
aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.setSeconds(0)
aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.setMilliseconds(0)

export {
  aTimeSlotAtSuzanTodayAt_12_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtHannaIn6DaysAt_13_00,
}
