export const getAppointmentTimeOfDayPrettified = ({ aDate }: { aDate: string }) => {
  const [h, m] = new Date(aDate).toTimeString().split(":")
  return `${h}:${m}`
}
