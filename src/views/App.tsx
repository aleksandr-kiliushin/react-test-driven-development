import React from "react"

import { ICustomer } from "#types/ICustomer"

import { AppointmentFormLoader } from "./AppointmentForm/AppointmentFormLoader"
import { AppointmentsDayViewLoader } from "./AppointmentsDayView/AppointmentsDayViewLoader"
import { CustomerForm } from "./CustomerForm"

const today = new Date()

export const App: React.FC = () => {
  const [view, setView] = React.useState<"addAppointment" | "addCustomer" | "dayView">("dayView")
  const [customer, setCustomer] = React.useState<ICustomer | undefined>()

  const transitionToAddCustomer = React.useCallback(() => {
    setView("addCustomer")
  }, [])
  const transitionToAddAppointment = React.useCallback((customer: ICustomer) => {
    setCustomer(customer)
    setView("addAppointment")
  }, [])
  const transitionToDayView = React.useCallback(() => {
    setView("dayView")
  }, [])

  switch (view) {
    case "addAppointment":
      if (customer === undefined) return null
      return <AppointmentFormLoader customer={customer} onSave={transitionToDayView} />
    case "addCustomer":
      if (customer === undefined) return null
      return <CustomerForm initialCustomerData={customer} onCustomerCreated={transitionToAddAppointment} />
    default:
      return (
        <React.Fragment>
          <div className="button-bar">
            <button type="button" id="addCustomer" onClick={transitionToAddCustomer}>
              Add customer and appointment
            </button>
          </div>
          <AppointmentsDayViewLoader today={today} />
        </React.Fragment>
      )
  }
}
