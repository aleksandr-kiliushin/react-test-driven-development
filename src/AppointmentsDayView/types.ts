export type Customer = {
  firstName: string
}

export type Appointment = {
  customer: Customer
  startsAt: number
}
