import React from "react"

import RadioButtonIfAvailable, { TimeSlot } from "./RadioButtonIfAvailable"

const getDailyTimeSlots = ({
  salonClosesAt,
  salonOpensAt,
}: {
  salonClosesAt: number
  salonOpensAt: number
}): number[] => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  const increment = 30 * 60 * 1000
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]))
}

const getWeeklyDateValues = ({ startDate }: { startDate: Date }): number[] => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const increment = 24 * 60 * 60 * 1000
  return Array(7)
    .fill([midnight])
    .reduce((acc, _, i) => acc.concat([midnight + i * increment]))
}

const timestampToTimeString = (timestamp: number) => {
  return new Date(timestamp).toTimeString().substring(0, 5)
}

const shortenDate = ({ timestamp }: { timestamp: number }) => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ")
  return `${day} ${dayOfMonth}`
}

type Props = {
  availableTimeSlots: TimeSlot[]
  salonClosesAt: number
  salonOpensAt: number
  selectedSlotTimestamp: number | null
  setSelectedSlotTimestamp: React.Dispatch<React.SetStateAction<number | null>>
  today: Date
}

const TimeSlotTable: React.FC<Props> = ({
  availableTimeSlots,
  salonClosesAt,
  salonOpensAt,
  selectedSlotTimestamp,
  setSelectedSlotTimestamp,
  today,
}) => {
  const theFollowingWeekDatesTimestamps = getWeeklyDateValues({ startDate: today })
  const timeSlotsTimestamps = getDailyTimeSlots({ salonClosesAt, salonOpensAt })

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {theFollowingWeekDatesTimestamps.map((aDateTimestamp) => {
            return <th key={aDateTimestamp}>{shortenDate({ timestamp: aDateTimestamp })}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {timeSlotsTimestamps.map((aTimestamp) => (
          <tr key={aTimestamp}>
            <th>{timestampToTimeString(aTimestamp)}</th>
            {theFollowingWeekDatesTimestamps.map((date) => {
              return (
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  key={date.toString()}
                  selectedSlotTimestamp={selectedSlotTimestamp}
                  setSelectedSlotTimestamp={setSelectedSlotTimestamp}
                  slotTimestamp={aTimestamp}
                />
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimeSlotTable
