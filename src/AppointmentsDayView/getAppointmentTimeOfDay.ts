const getAppointmentTimeOfDay = ({ aTimestamp }: { aTimestamp: number }) => {
  const [h, m] = new Date(aTimestamp).toTimeString().split(":")
  return `${h}:${m}`
}

export default getAppointmentTimeOfDay
