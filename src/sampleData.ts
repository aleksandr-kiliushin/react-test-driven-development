const today = new Date()

const at = ({ hours }: { hours: number }) => {
  return today.setHours(hours, 0)
}

export const sampleAppointments = [
  { startsAt: at({ hours: 9 }), customer: { firstName: "Charlie" } },
  { startsAt: at({ hours: 10 }), customer: { firstName: "Frankie" } },
  { startsAt: at({ hours: 11 }), customer: { firstName: "Casey" } },
  { startsAt: at({ hours: 12 }), customer: { firstName: "Ashley" } },
  { startsAt: at({ hours: 13 }), customer: { firstName: "Jordan" } },
  { startsAt: at({ hours: 14 }), customer: { firstName: "Jay" } },
  { startsAt: at({ hours: 15 }), customer: { firstName: "Alex" } },
  { startsAt: at({ hours: 16 }), customer: { firstName: "Jules" } },
  { startsAt: at({ hours: 17 }), customer: { firstName: "Stevie" } },
]
