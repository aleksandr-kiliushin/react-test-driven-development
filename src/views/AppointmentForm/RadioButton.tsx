import React from "react"

import { IAppointment } from "#types/IAppointment"

interface IProps {
  availableTimeSlots: IAppointment["timeSlot"][]
  dayOfTheFoollowingWeekDate: Date
  selectedTimeSlot: Date | null
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<Date | null>>
  timeSlotsInTermsOfADay: IAppointment["timeSlot"]
}

export const RadioButton: React.FC<IProps> = ({
  availableTimeSlots,
  dayOfTheFoollowingWeekDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  timeSlotsInTermsOfADay,
}) => {
  if (selectedTimeSlot === null) return null

  const anAppointmenTimestamp = new Date(dayOfTheFoollowingWeekDate)
  anAppointmenTimestamp.setHours(new Date(timeSlotsInTermsOfADay).getHours())
  anAppointmenTimestamp.setMinutes(new Date(timeSlotsInTermsOfADay).getMinutes())

  const isChecked = selectedTimeSlot.toString() === anAppointmenTimestamp.toString()

  if (availableTimeSlots.some((aSlot) => aSlot.toString() === anAppointmenTimestamp.toString())) {
    return (
      <input
        checked={isChecked}
        name="startsAt"
        onChange={(event) => setSelectedTimeSlot(new Date(event.target.value))}
        type="radio"
        value={anAppointmenTimestamp.toString()}
      />
    )
  }

  return null
}
