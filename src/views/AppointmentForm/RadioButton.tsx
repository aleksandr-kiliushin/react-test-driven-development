import React from "react"

import { ITimeSlot } from "#types/ITimeSlot"

interface IRadioButtonProps {
  availableTimeSlotsForSelectedStylistName: ITimeSlot[]
  dayOfTheFoollowingWeekDate: Date
  selectedStartsAtDate: ITimeSlot["startsAt"] | undefined
  setSelectedStartsAtDate: React.Dispatch<React.SetStateAction<ITimeSlot["startsAt"] | undefined>>
  startsAtDateInTermsOfADay: Date
}

export const RadioButton: React.FC<IRadioButtonProps> = ({
  availableTimeSlotsForSelectedStylistName,
  dayOfTheFoollowingWeekDate,
  selectedStartsAtDate,
  setSelectedStartsAtDate,
  startsAtDateInTermsOfADay,
}) => {
  let anAppointmentDateTime: Date | string = new Date(dayOfTheFoollowingWeekDate)
  anAppointmentDateTime.setHours(new Date(startsAtDateInTermsOfADay).getHours())
  anAppointmentDateTime.setMinutes(new Date(startsAtDateInTermsOfADay).getMinutes())
  anAppointmentDateTime = anAppointmentDateTime.toISOString()

  if (availableTimeSlotsForSelectedStylistName.every((aSlot) => aSlot.startsAt !== anAppointmentDateTime)) {
    return null
  }

  return (
    <input
      checked={selectedStartsAtDate === anAppointmentDateTime}
      name="startsAt"
      onChange={(event) => setSelectedStartsAtDate(event.target.value)}
      type="radio"
      value={anAppointmentDateTime}
    />
  )
}
