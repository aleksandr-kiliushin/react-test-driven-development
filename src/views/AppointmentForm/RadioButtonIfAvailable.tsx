import React from "react"

export type TimeSlot = {
  startsAt: number
}

type Props = {
  availableTimeSlots: TimeSlot[]
  date: number
  selectedSlotTimestamp: number | null
  setSelectedSlotTimestamp: React.Dispatch<React.SetStateAction<number | null>>
  slotTimestamp: TimeSlot["startsAt"]
}

const RadioButtonIfAvailable: React.FC<Props> = ({
  availableTimeSlots,
  date,
  selectedSlotTimestamp,
  setSelectedSlotTimestamp,
  slotTimestamp,
}) => {
  const anAppointmenTimestamp = new Date(date)
  anAppointmenTimestamp.setHours(new Date(slotTimestamp).getHours())
  anAppointmenTimestamp.setMinutes(new Date(slotTimestamp).getMinutes())

  const isChecked = selectedSlotTimestamp === slotTimestamp

  if (availableTimeSlots.some((aSlot) => aSlot.startsAt === anAppointmenTimestamp.valueOf())) {
    return (
      <td>
        <input
          checked={isChecked}
          name="startsAt"
          onChange={(event) => setSelectedSlotTimestamp(parseInt(event.target.value))}
          type="radio"
          value={anAppointmenTimestamp.valueOf().toString()}
        />
      </td>
    )
  }

  return null
}

export default RadioButtonIfAvailable
