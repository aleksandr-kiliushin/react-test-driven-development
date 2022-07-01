import { faker } from "@faker-js/faker/locale/en"

import { IAppointment } from "#types/IAppointment"

import { getARandomStylist } from "./getRandomStylists"

const today = new Date()

const todayAt = ({ hours }: { hours: number }) => {
  return today.setHours(hours, 0, 0, 0)
}

export const randomAppointmentsForToday: IAppointment[] = [10, 11, 12, 13, 14, 15, 16].map<IAppointment>((hours) => ({
  customer: {
    firstName: faker.name.firstName(),
    id: parseFloat(faker.random.numeric()),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.number(),
  },
  notes: faker.lorem.sentence(10),
  serviceName: faker.word.noun(),
  timeSlot: {
    startsAt: new Date(todayAt({ hours })).toISOString(),
    stylist: getARandomStylist(),
  },
}))
