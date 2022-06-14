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
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

const TimeSlotTable: React.FC<Props> = ({ salonClosesAt, salonOpensAt, today }) => {
  const dates = getWeeklyDateValues({ startDate: today })
  const timeSlots = getDailyTimeSlots({ salonClosesAt, salonOpensAt })

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map((aDateTimestamp) => {
            return <th key={aDateTimestamp}>{shortenDate({ timestamp: aDateTimestamp })}</th>
          })}
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
