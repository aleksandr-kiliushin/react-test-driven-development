export const getAppointmentTimeOfDayPrettified = ({ aDate }: { aDate: Date }) => {
  const [h, m] = aDate.toTimeString().split(":")
  return `${h}:${m}`
}
