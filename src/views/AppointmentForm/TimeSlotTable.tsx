import React from "react"

import { IAppointment } from "#types/IAppointment"

import { RadioButton } from "./RadioButton"

const getDailyTimeSlots = ({
  salonClosesAt,
  salonOpensAt,
}: {
  salonClosesAt: number
  salonOpensAt: number
}): Date[] => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0)
  const increment = 30 * 60 * 1000
  return Array(totalSlots)
    .fill([new Date(startTime)])
    .reduce((acc, _, i) => acc.concat([new Date(startTime + i * increment)]))
}

const getWeeklyDateValues = ({ startDate }: { startDate: Date }): Date[] => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const increment = 24 * 60 * 60 * 1000
  return Array(7)
    .fill([new Date(midnight)])
    .reduce((acc, _, i) => acc.concat([new Date(midnight + i * increment)]))
}

const timestampToTimeString = (timestamp: Date) => {
  return timestamp.toTimeString().substring(0, 5)
}

const shortenDate = ({ aDate }: { aDate: Date }) => {
  const [day, , dayOfMonth] = aDate.toDateString().split(" ")
  return `${day} ${dayOfMonth}`
}

interface IProps {
  availableTimeSlots: IAppointment["timeSlot"][]
  salonClosesAt: number
  salonOpensAt: number
  selectedTimeSlot: Date | null
  setSelectedTimeSlot: React.Dispatch<React.SetStateAction<Date | null>>
  today: Date
}

export const TimeSlotTable: React.FC<IProps> = ({
  availableTimeSlots,
  salonClosesAt,
  salonOpensAt,
  selectedTimeSlot,
  setSelectedTimeSlot,
  today,
}) => {
  const theFollowingWeekDatesTimestamps = getWeeklyDateValues({ startDate: today })
  const timeSlotsTimestamps = getDailyTimeSlots({ salonClosesAt, salonOpensAt })

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {theFollowingWeekDatesTimestamps.map((aDate) => (
            <th className="border border-sky-900 bg-sky-300" key={aDate.toString()}>
              {shortenDate({ aDate })}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlotsTimestamps.map((aTimestamp) => (
          <tr key={aTimestamp.toString()}>
            <th className="border border-indigo-900 bg-indigo-300">{timestampToTimeString(aTimestamp)}</th>
            {theFollowingWeekDatesTimestamps.map((aDate) => (
              <td className="border border-teal-900 bg-teal-100" key={aDate.toString()}>
                <RadioButton
                  availableTimeSlots={availableTimeSlots}
                  date={aDate}
                  selectedTimeSlot={selectedTimeSlot}
                  setSelectedTimeSlot={setSelectedTimeSlot}
                  slotTimestamp={aTimestamp}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
