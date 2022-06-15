import { ICustomer } from "./ICustomer"
import { ITimeSlot } from "./ITimeSlot"

export interface Appointment {
  customer: ICustomer
  notes: string
  serviceName: string
  startsAt: ITimeSlot["startsAt"]
  stylistName: string
}
