const aTimeSlotTodayAt_14_00 = new Date()
aTimeSlotTodayAt_14_00.setHours(14)
aTimeSlotTodayAt_14_00.setMinutes(0)

const aTimeSlotTodayAt_16_30 = new Date()
aTimeSlotTodayAt_16_30.setHours(16, 0, 0, 0)
aTimeSlotTodayAt_16_30.setHours(16, 30, 0, 0)

const aTimeSlotTomorrowAt_12_00 = new Date()
aTimeSlotTomorrowAt_12_00.setDate(new Date().getDate() + 1)
aTimeSlotTomorrowAt_12_00.setHours(12)
aTimeSlotTomorrowAt_12_00.setMinutes(0)

const aTimeSlotInAWeekAt_17_30 = new Date()
aTimeSlotInAWeekAt_17_30.setDate(new Date().getDate() + 6)
aTimeSlotInAWeekAt_17_30.setHours(17)
aTimeSlotInAWeekAt_17_30.setMinutes(30)

export { aTimeSlotTodayAt_14_00, aTimeSlotTodayAt_16_30, aTimeSlotTomorrowAt_12_00, aTimeSlotInAWeekAt_17_30 }
