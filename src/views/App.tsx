import React from "react"
import { Link, Route, Routes } from "react-router-dom"

import { TODO_MAKE_DATE_RANDOM_TOO_randomAppointments } from "#sampleData/randomAppointments"
import { aCustomer1 } from "#sampleData/someCustomers"

import { AppointmentForm } from "./AppointmentForm"
import { AppointmentsDayView } from "./AppointmentsDayView"
import { CustomerForm } from "./CustomerForm"

export const App: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/appointments-day-view">AppointmentsDayView</Link>
          </li>
          <li>
            <Link to="/customer-form">CustomerForm</Link>
          </li>
          <li>
            <Link to="/appointment-form">AppointmentForm</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          element={<AppointmentsDayView appointments={TODO_MAKE_DATE_RANDOM_TOO_randomAppointments} />}
          path="/appointments-day-view"
        />
        <Route
          element={
            <CustomerForm
              initialCustomerData={aCustomer1}
              onSubmit={(formValues) => {
                console.log(JSON.stringify(formValues, null, 2))
              }}
            />
          }
          path="/customer-form"
        />
        <Route
          element={
            <AppointmentForm
              availableServiceNames={["Cut", "Blow-dry", "Cut & color", "Beard trim", "Cut & beard trim", "Extensions"]}
              availableTimeSlots={[
                { startsAt: new Date().setHours(14, 0, 0, 0) },
                { startsAt: new Date().setHours(14, 30, 0, 0) },
                { startsAt: new Date().setHours(17, 30, 0, 0) },
              ]}
              onSubmit={(formValues) => {
                console.log(JSON.stringify(formValues, null, 2))
              }}
              defaultServiceName="Cut"
              salonClosesAt={19}
              salonOpensAt={12}
              today={new Date()}
            />
          }
          path="/appointment-form"
        />
      </Routes>
    </>
  )
}
