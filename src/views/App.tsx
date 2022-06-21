import React from "react"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"

import { AppointmentFormLoader } from "./AppointmentForm/AppointmentFormLoader"
import { AppointmentsDayViewLoader } from "./AppointmentsDayView/AppointmentsDayViewLoader"
import { CustomerForm } from "./CustomerForm"
import { CustomerSearch } from "./CustomerSearch"

const today = new Date()

export const App: React.FC = () => {
  const [view, setView] = React.useState<"addAppointment" | "addCustomer" | "dayView" | "searchCustomers">("dayView")
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
      return <CustomerForm initialCustomerData={aCustomer1} onCustomerCreated={transitionToAddAppointment} />
    case "searchCustomers":
      return (
        <CustomerSearch
          renderCustomerActions={(aCustomer) => (
            <button onClick={() => transitionToAddAppointment(aCustomer)} role="button">
              Create appointment
            </button>
          )}
        />
      )
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
