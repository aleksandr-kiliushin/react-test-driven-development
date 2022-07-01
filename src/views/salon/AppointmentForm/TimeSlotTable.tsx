import React from "react"

import { ITimeSlot } from "#types/salon/ITimeSlot"

import { RadioButton } from "./RadioButton"

const getTimeSlotsInTermsOfADay = ({
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

const getDatesForEachDayOfTheFollowingWeek = ({ startDate }: { startDate: Date }): Date[] => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const increment = 24 * 60 * 60 * 1000
  return Array(7)
    .fill([new Date(midnight)])
    .reduce((acc, _, i) => acc.concat([new Date(midnight + i * increment)]))
}

const aDateToTimeString = (aDate: Date) => {
  return aDate.toTimeString().substring(0, 5)
}

const shortenDate = ({ aDate }: { aDate: Date }) => {
  const [day, , dayOfMonth] = aDate.toDateString().split(" ")
  return `${day} ${dayOfMonth}`
}

interface ITimeSlotTableProps {
  availableTimeSlotsForSelectedStylistName: ITimeSlot[]
  salonClosesAt: number
  salonOpensAt: number
  selectedStartsAtDate: ITimeSlot["startsAt"] | undefined
  setSelectedStartsAtDate: React.Dispatch<React.SetStateAction<ITimeSlot["startsAt"] | undefined>>
  today: Date
}

export const TimeSlotTable: React.FC<ITimeSlotTableProps> = ({
  availableTimeSlotsForSelectedStylistName,
  salonClosesAt,
  salonOpensAt,
  selectedStartsAtDate,
  setSelectedStartsAtDate,
  today,
}) => {
  const datesForEachDayOfTheFollowingWeek = getDatesForEachDayOfTheFollowingWeek({ startDate: today })
  const timeSlotsInTermsOfADay = getTimeSlotsInTermsOfADay({ salonClosesAt, salonOpensAt })

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {datesForEachDayOfTheFollowingWeek.map((aDate) => (
            <th className="border border-sky-900 bg-sky-300" key={aDate.toString()}>
              {shortenDate({ aDate })}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlotsInTermsOfADay.map((startsAtDateInTermsOfADay) => (
          <tr key={startsAtDateInTermsOfADay.toString()}>
            <th className="border border-indigo-900 bg-indigo-300">{aDateToTimeString(startsAtDateInTermsOfADay)}</th>
            {datesForEachDayOfTheFollowingWeek.map((aDayOfTheFoollowingWeekDate) => (
              <td className="border border-teal-900 bg-teal-100" key={aDayOfTheFoollowingWeekDate.toString()}>
                <RadioButton
                  availableTimeSlotsForSelectedStylistName={availableTimeSlotsForSelectedStylistName}
                  dayOfTheFoollowingWeekDate={aDayOfTheFoollowingWeekDate}
                  selectedStartsAtDate={selectedStartsAtDate}
                  setSelectedStartsAtDate={setSelectedStartsAtDate}
                  startsAtDateInTermsOfADay={startsAtDateInTermsOfADay}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
