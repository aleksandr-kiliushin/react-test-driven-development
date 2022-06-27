import React from "react"

import { fetchAndSetAvailableTimeSlots } from "#store/appointment-creation"
import { ICustomer } from "#types/ICustomer"
import { useAppDispatch } from "#utils/useAppDispatch"
import { useAppSelector } from "#utils/useAppSelector"

import { AppointmentForm } from "./index"

const today = new Date()

export interface IAppointmentFormLoaderProps {
  customer: ICustomer
  onAppointmentCreated(): void
}

export const AppointmentFormLoader: React.FC<IAppointmentFormLoaderProps> = ({ customer, onAppointmentCreated }) => {
  const dispatch = useAppDispatch()
  const availableTimeSlots = useAppSelector((state) => state.appointmentCreation.availableTimeSlots)

  React.useEffect(() => {
    dispatch(fetchAndSetAvailableTimeSlots())
  }, [])

  return (
    <AppointmentForm
      availableServiceNames={["Blow-dry", "Cut", "Cut & color", "Beard trim", "Extensions"]}
      availableStylists={[
        { name: "Hanna", sertifiedServicesNames: ["Cut", "Cut & color"] },
        { name: "Suzan", sertifiedServicesNames: ["Cut", "Blow-dry"] },
        { name: "George", sertifiedServicesNames: ["Beard trim"] },
        { name: "Rebecca", sertifiedServicesNames: ["Extensions", "Blow-dry"] },
      ]}
      availableTimeSlots={availableTimeSlots}
      defaultServiceName="Cut"
      onAppointmentCreated={onAppointmentCreated}
      salonClosesAt={19}
      salonOpensAt={9}
      today={today}
      customer={customer}
    />
  )
}
