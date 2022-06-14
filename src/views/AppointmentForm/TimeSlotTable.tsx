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

export type TimeSlot = {
  startsAt: number
}

type Props = {
  availableTimeSlots: TimeSlot[]
  salonClosesAt: number
  salonOpensAt: number
  today: Date
}

const TimeSlotTable: React.FC<Props> = ({ availableTimeSlots, salonClosesAt, salonOpensAt, today }) => {
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
              const anAppointmenTimestamp = new Date(date)
              anAppointmenTimestamp.setHours(new Date(aTimestamp).getHours())
              anAppointmenTimestamp.setMinutes(new Date(aTimestamp).getMinutes())

              if (
                availableTimeSlots.some(
                  (anAvailableTimeSlot) => anAvailableTimeSlot.startsAt === anAppointmenTimestamp.valueOf()
                )
              ) {
                return (
                  <td key={date}>
                    <input type="radio" />
                  </td>
                )
              }

              return null
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimeSlotTable
