import React from "react"

import { IAppointment } from "#types/IAppointment"

interface IProps {
  availableTimeSlots: IAppointment["timeSlot"][]
  date: Date
  selectedTimeSlot: Date | null
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<Date | null>>
  slotTimestamp: IAppointment["timeSlot"]
}

export const RadioButton: React.FC<IProps> = ({
  availableTimeSlots,
  date,
  selectedTimeSlot,
  setSelectedTimeSlot,
  slotTimestamp,
}) => {
  const anAppointmenTimestamp = new Date(date)
  anAppointmenTimestamp.setHours(new Date(slotTimestamp).getHours())
  anAppointmenTimestamp.setMinutes(new Date(slotTimestamp).getMinutes())

  if (selectedTimeSlot === null) return null

  const isChecked = selectedTimeSlot.toString() === slotTimestamp.toString()

  if (availableTimeSlots.some((aSlot) => aSlot.toString() === anAppointmenTimestamp.toString())) {
    return (
      <td>
        <input
          checked={isChecked}
          name="startsAt"
          onChange={(event) => setSelectedTimeSlot(new Date(parseInt(event.target.value)))}
          type="radio"
          value={anAppointmenTimestamp.toString()}
        />
      </td>
    )
  }

  return null
}
