export type Customer = {
  firstName: string
  lastName: string
  phoneNumber: string
}

export type Appointment = {
  customer: Customer
  notes: string
  serviceName: string
  startsAt: number
  stylistName: string
}
