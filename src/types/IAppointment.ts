import { ICustomer } from "./ICustomer"

export interface IAppointment {
  customer: ICustomer
  notes: string
  serviceName: string
  stylistName: string
  timeSlot: Date
}
