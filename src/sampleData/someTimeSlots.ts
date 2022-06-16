import { ITimeSlot } from "#types/ITimeSlot"

const aTimeSlotTodayAt_12_00: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Jessica",
    sertifiedServicesNames: ["Cut", "Blow-dry"],
  },
}
aTimeSlotTodayAt_12_00.startsAt.setHours(12)
aTimeSlotTodayAt_12_00.startsAt.setMinutes(0)
aTimeSlotTodayAt_12_00.startsAt.setSeconds(0)
aTimeSlotTodayAt_12_00.startsAt.setMilliseconds(0)

const aTimeSlotTodayAt_13_30: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Jessica",
    sertifiedServicesNames: ["Cut"],
  },
}
aTimeSlotTodayAt_13_30.startsAt.setHours(13)
aTimeSlotTodayAt_13_30.startsAt.setMinutes(30)
aTimeSlotTodayAt_13_30.startsAt.setSeconds(0)
aTimeSlotTodayAt_13_30.startsAt.setMilliseconds(0)

const aTimeSlotInTwoDaysAt_12_00: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Jessica",
    sertifiedServicesNames: ["Blow-dry"],
  },
}
aTimeSlotInTwoDaysAt_12_00.startsAt.setDate(new Date().getDate() + 3)
aTimeSlotInTwoDaysAt_12_00.startsAt.setHours(12)
aTimeSlotInTwoDaysAt_12_00.startsAt.setMinutes(0)
aTimeSlotInTwoDaysAt_12_00.startsAt.setSeconds(0)
aTimeSlotInTwoDaysAt_12_00.startsAt.setMilliseconds(0)

const aTimeSlotIn6DaysAt_13_00: ITimeSlot = {
  startsAt: new Date(),
  stylist: {
    name: "Jessica",
    sertifiedServicesNames: ["Cut", "Blow-dry"],
  },
}
aTimeSlotIn6DaysAt_13_00.startsAt.setDate(new Date().getDate() + 6)
aTimeSlotIn6DaysAt_13_00.startsAt.setHours(13)
aTimeSlotIn6DaysAt_13_00.startsAt.setMinutes(0)
aTimeSlotIn6DaysAt_13_00.startsAt.setSeconds(0)
aTimeSlotIn6DaysAt_13_00.startsAt.setMilliseconds(0)

export { aTimeSlotTodayAt_12_00, aTimeSlotTodayAt_13_30, aTimeSlotInTwoDaysAt_12_00, aTimeSlotIn6DaysAt_13_00 }
