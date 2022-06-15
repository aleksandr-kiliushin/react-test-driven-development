import { IAppointment } from "#types/IAppointment"

const today = new Date()

const todayAt = ({ hours }: { hours: number }) => {
  return today.setHours(hours, 0)
}

const anAppointment1: IAppointment = {
  customer: {
    firstName: "Roscoe",
    lastName: "Schmeler",
    phoneNumber: "995.319.0012",
  },
  notes: "Ducimus numquam aperiam aut sunt enim nihil natus similique ducimus.",
  serviceName: "grief",
  startsAt: new Date(todayAt({ hours: 9 })),
  stylistName: "Glenda",
}

const anAppointment2: IAppointment = {
  customer: {
    firstName: "Cara",
    lastName: "Schaefer",
    phoneNumber: "504-716-6011 x80954",
  },
  notes: "Corporis autem nulla quos dolor ducimus architecto a mollitia est.",
  serviceName: "preference",
  startsAt: new Date(todayAt({ hours: 10 })),
  stylistName: "Olin",
}

export const someAppointments = [anAppointment1, anAppointment2]
