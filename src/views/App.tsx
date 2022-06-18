import React from "react"
import { Link, Route, Routes } from "react-router-dom"

import { getRandomTimeSlots } from "#sampleData/getRandomTimeSlots"
import { randomAppointmentsForToday } from "#sampleData/randomAppointmentsForToday"
import { aCustomer1 } from "#sampleData/someCustomers"

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
          element={<AppointmentsDayView appointments={randomAppointmentsForToday} />}
          path="/appointments-day-view"
        />
        <Route
          element={
            <CustomerForm
              initialCustomerData={aCustomer1}
              onCustomerCreated={(createdCustomer) => {
                console.log(JSON.stringify(createdCustomer, null, 2))
              }}
            />
          }
          path="/customer-form"
        />
        <Route
          element={
            <AppointmentForm
              availableServiceNames={["Cut", "Blow-dry", "Cut & color", "Beard trim", "Cut & beard trim", "Extensions"]}
              availableStylists={[
                { name: "Hanna", sertifiedServicesNames: ["Cut"] },
                { name: "Suzan", sertifiedServicesNames: ["Cut", "Blow-dry"] },
              ]}
              availableTimeSlots={getRandomTimeSlots()}
              onSubmit={(formValues) => {
                console.log(JSON.stringify(formValues, null, 2))
              }}
              defaultServiceName="Cut"
              salonClosesAt={19}
              salonOpensAt={9}
              today={new Date()}
            />
          }
          path="/appointment-form"
        />
      </Routes>
    </>
  )
}
