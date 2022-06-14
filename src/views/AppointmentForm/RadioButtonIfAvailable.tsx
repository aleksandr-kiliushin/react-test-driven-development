import React from "react"

export type TimeSlot = {
  startsAt: number
}

type Props = {
  availableTimeSlots: TimeSlot[]
  date: number
  slotTimestamp: TimeSlot["startsAt"]
}

const RadioButtonIfAvailable: React.FC<Props> = ({ availableTimeSlots, date, slotTimestamp }) => {
  const anAppointmenTimestamp = new Date(date)
  anAppointmenTimestamp.setHours(new Date(slotTimestamp).getHours())
  anAppointmenTimestamp.setMinutes(new Date(slotTimestamp).getMinutes())

  if (availableTimeSlots.some((aSlot) => aSlot.startsAt === anAppointmenTimestamp.valueOf())) {
    return (
      <td>
        <input name="startsAt" type="radio" value={anAppointmenTimestamp.valueOf().toString()} />
      </td>
    )
  }

  return null
}

export default RadioButtonIfAvailable
