import { noop } from "lodash"
import React from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"

import { AppointmentFormLoader } from "./AppointmentForm/AppointmentFormLoader"
import { AppointmentsDayViewLoader } from "./AppointmentsDayView/AppointmentsDayViewLoader"
import { CustomerForm } from "./CustomerForm"
import { CustomerSearch } from "./CustomerSearch"

const today = new Date()

export const App: React.FC = () => {
  const navigate = useNavigate()
  const [customer, setCustomer] = React.useState<ICustomer | undefined>()

  return (
    <Routes>
      <Route
        element={
          <>
            <div className="button-bar">
              <Link className="bg-cyan-200 hover:bg-cyan-500" to="/add-a-customer">
                Add customer and appointment
              </Link>
              <Link className="bg-violet-200 hover:bg-violet-500" to="/customers-search">
                Customers search
              </Link>
            </div>
            <AppointmentsDayViewLoader today={today} />
          </>
        }
        path="/"
      />
      <Route
        element={
          <CustomerSearch
            renderCustomerActions={(aCustomer) => (
              <button onClick={() => setCustomer(aCustomer)} role="button">
                Create appointment
              </button>
            )}
          />
        }
        path="/customers-search"
      />
      <Route
        element={
          <CustomerForm
            onCustomerCreated={(createdCustomer) => {
              setCustomer(createdCustomer)
              navigate("/add-an-appointment")
            }}
            initialCustomerData={aCustomer1}
          />
        }
        path="add-a-customer"
      />
      <Route
        element={customer !== undefined && <AppointmentFormLoader customer={customer} onAppointmentCreated={noop} />}
        path="add-an-appointment"
      />
    </Routes>
  )
}
