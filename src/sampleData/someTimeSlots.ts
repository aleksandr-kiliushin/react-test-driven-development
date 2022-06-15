const aTimeSlotTodayAt_12_00 = new Date()
aTimeSlotTodayAt_12_00.setHours(12)
aTimeSlotTodayAt_12_00.setMinutes(0)
aTimeSlotTodayAt_12_00.setSeconds(0)
aTimeSlotTodayAt_12_00.setMilliseconds(0)

const aTimeSlotTodayAt_13_30 = new Date()
aTimeSlotTodayAt_13_30.setHours(13)
aTimeSlotTodayAt_13_30.setMinutes(30)
aTimeSlotTodayAt_13_30.setSeconds(0)
aTimeSlotTodayAt_13_30.setMilliseconds(0)

const aTimeSlotInTwoDaysAt_12_00 = new Date()
aTimeSlotInTwoDaysAt_12_00.setDate(new Date().getDate() + 3)
aTimeSlotInTwoDaysAt_12_00.setHours(12)
aTimeSlotInTwoDaysAt_12_00.setMinutes(0)
aTimeSlotInTwoDaysAt_12_00.setSeconds(0)
aTimeSlotInTwoDaysAt_12_00.setMilliseconds(0)

const aTimeSlotIn6DaysAt_13_00 = new Date()
aTimeSlotIn6DaysAt_13_00.setDate(new Date().getDate() + 6)
aTimeSlotIn6DaysAt_13_00.setHours(13)
aTimeSlotIn6DaysAt_13_00.setMinutes(0)
aTimeSlotIn6DaysAt_13_00.setSeconds(0)
aTimeSlotIn6DaysAt_13_00.setMilliseconds(0)

export { aTimeSlotTodayAt_12_00, aTimeSlotTodayAt_13_30, aTimeSlotInTwoDaysAt_12_00, aTimeSlotIn6DaysAt_13_00 }
