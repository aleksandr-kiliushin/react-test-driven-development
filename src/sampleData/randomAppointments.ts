import { faker } from "@faker-js/faker/locale/en"

import { IAppointment } from "#types/IAppointment"

const today = new Date()

const todayAt = ({ hours }: { hours: number }) => {
  return today.setHours(hours, 0)
}

export const randomAppointments: IAppointment[] = [10, 11, 12, 13, 14, 15, 16].map<IAppointment>((hours) => ({
  customer: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
  },
  notes: faker.lorem.sentence(10),
  serviceName: faker.word.noun(),
  startsAt: new Date(todayAt({ hours })),
  stylistName: faker.name.firstName(),
}))
