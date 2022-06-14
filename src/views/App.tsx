import React from "react"
import { Link, Route, Routes } from "react-router-dom"

import AppointmentForm from "./AppointmentForm"
import AppointmentsDayView from "./AppointmentsDayView"
import { sampleAppointments } from "./AppointmentsDayView/sampleData"
import CustomerForm from "./CustomerForm"

const App: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/appointments-day-view">AppointmentsDayView</Link>
            <Link to="/customer-form">CustomerForm</Link>
            <Link to="/appointment-form">AppointmentForm</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route element={<AppointmentsDayView appointments={sampleAppointments} />} path="/appointments-day-view" />
        <Route
          element={
            <CustomerForm
              firstName="Jessy"
              lastName="Peterson"
              onSubmit={(formValues) => {
                console.log(JSON.stringify(formValues, null, 2))
              }}
              phoneNumber="123-456-789"
            />
          }
          path="/customer-form"
        />
        <Route
          element={
            <AppointmentForm
              availableServiceNames={["Cut", "Blow-dry", "Cut & color", "Beard trim", "Cut & beard trim", "Extensions"]}
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

export default App