import React from "react"

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

const timestampToTimeString = (timestamp: number) => {
  return new Date(timestamp).toTimeString().substring(0, 5)
}

type Props = {
  salonClosesAt: number
  salonOpensAt: number
}

const TimeSlotTable: React.FC<Props> = ({ salonClosesAt, salonOpensAt }) => {
  const timeSlots = getDailyTimeSlots({ salonClosesAt, salonOpensAt })

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((aTimeSlot) => (
          <tr key={aTimeSlot}>
            <th>{timestampToTimeString(aTimeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimeSlotTable
