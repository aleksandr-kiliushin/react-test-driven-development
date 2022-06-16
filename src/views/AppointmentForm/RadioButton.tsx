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
  const anAppointmenDate = new Date(dayOfTheFoollowingWeekDate)
  anAppointmenDate.setHours(new Date(startsAtDateInTermsOfADay).getHours())
  anAppointmenDate.setMinutes(new Date(startsAtDateInTermsOfADay).getMinutes())

  const isChecked =
    selectedStartsAtDate !== undefined && selectedStartsAtDate.toString() === anAppointmenDate.toString()

  if (
    availableTimeSlotsForSelectedStylistName.every((aSlot) => aSlot.startsAt.toString() !== anAppointmenDate.toString())
  ) {
    return null
  }

  return (
    <input
      checked={isChecked}
      name="startsAt"
      onChange={(event) => setSelectedStartsAtDate(new Date(event.target.value))}
      type="radio"
      value={anAppointmenDate.toString()}
    />
  )
}
