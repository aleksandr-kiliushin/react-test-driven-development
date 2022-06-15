import { ITimeSlot } from "#types/ITimeSlot"

const todayAt_14_00 = new Date()
todayAt_14_00.setHours(14)
todayAt_14_00.setMinutes(0)

const todayAt_16_30 = new Date()
todayAt_16_30.setHours(16, 0, 0, 0)
todayAt_16_30.setHours(16, 30, 0, 0)

const tomorrowAt_12_00 = new Date()
tomorrowAt_12_00.setDate(new Date().getDate() + 1)
tomorrowAt_12_00.setHours(12)
tomorrowAt_12_00.setMinutes(0)

const inAWeekAt_17_30 = new Date()
inAWeekAt_17_30.setDate(new Date().getDate() + 6)
inAWeekAt_17_30.setHours(17)
inAWeekAt_17_30.setMinutes(30)

export const someStaticAvailableTimeSlots: ITimeSlot[] = [
  { startsAt: todayAt_14_00 },
  { startsAt: todayAt_16_30 },
  { startsAt: tomorrowAt_12_00 },
  { startsAt: inAWeekAt_17_30 },
]
