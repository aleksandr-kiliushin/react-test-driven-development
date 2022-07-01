import { IAppointment } from "./IAppointment"

export interface IStylist {
  name: string
  sertifiedServicesNames: IAppointment["serviceName"][]
}
