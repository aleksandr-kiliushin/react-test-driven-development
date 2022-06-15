import React from "react"
import { Link, Route, Routes } from "react-router-dom"

import { TODO_MAKE_DATE_RANDOM_TOO_randomAppointments } from "#sampleData/randomAppointments"
import { aCustomer1 } from "#sampleData/someCustomers"
import { aTimeSlotInTwoDaysAt_12_00, aTimeSlotTodayAt_12_00, aTimeSlotTodayAt_13_30 } from "#sampleData/someTimeSlots"

import { AppointmentForm } from "./AppointmentForm"
import { AppointmentsDayView } from "./AppointmentsDayView"
import { CustomerForm } from "./CustomerForm"

export const App: React.FC = () => {
  return (
    <>
      <nav>
        <ul className="flex gap-x-4 mb-4">
          <li>
            <Link className="underline text-purple-900" to="/appointments-day-view">
              AppointmentsDayView
            </Link>
          </li>
          <li>
            <Link className="underline text-purple-900" to="/customer-form">
              CustomerForm
            </Link>
          </li>
          <li>
            <Link className="underline text-purple-900" to="/appointment-form">
              AppointmentForm
            </Link>
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
              availableTimeSlots={[aTimeSlotTodayAt_12_00, aTimeSlotTodayAt_13_30, aTimeSlotInTwoDaysAt_12_00]}
              onSubmit={(formValues) => {
                console.log(JSON.stringify(formValues, null, 2))
              }}
              defaultServiceName="Cut"
              salonClosesAt={14}
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
