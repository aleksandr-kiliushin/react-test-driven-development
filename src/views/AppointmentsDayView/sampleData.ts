import { faker } from "@faker-js/faker/locale/en"

import { Appointment } from "./types"

const today = new Date()

const todayAt = ({ hours }: { hours: number }) => {
  return today.setHours(hours, 0)
}

export const sampleAppointments: Appointment[] = [10, 11, 12, 13, 14, 15, 16].map<Appointment>((hours) => ({
  customer: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
  },
  notes: faker.lorem.sentence(10),
  serviceName: faker.word.noun(),
  startsAt: todayAt({ hours }),
  stylistName: faker.name.firstName(),
}))

export const appointment1: Appointment = {
  customer: {
    firstName: "Roscoe",
    lastName: "Schmeler",
    phoneNumber: "995.319.0012",
  },
  notes: "Ducimus numquam aperiam aut sunt enim nihil natus similique ducimus.",
  serviceName: "grief",
  startsAt: todayAt({ hours: 9 }),
  stylistName: "Glenda",
}

export const appointment2: Appointment = {
  customer: {
    firstName: "Cara",
    lastName: "Schaefer",
    phoneNumber: "504-716-6011 x80954",
  },
  notes: "Corporis autem nulla quos dolor ducimus architecto a mollitia est.",
  serviceName: "preference",
  startsAt: todayAt({ hours: 10 }),
  stylistName: "Olin",
}
