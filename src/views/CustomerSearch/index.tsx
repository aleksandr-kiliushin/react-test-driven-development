import React from "react"

import { ICustomer } from "#types/ICustomer"

import { CustomerRow } from "./CustomerRow"
import { NavigationButtons } from "./NavigationButtons"

export const CustomerSearch: React.FC = () => {
  const [customers, setCustomers] = React.useState<ICustomer[]>([])

  React.useEffect(() => {
    globalThis
      .fetch("/customers", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then(setCustomers)
  }, [])

  const onNextButtonClick = React.useCallback(() => {
    const after = customers[customers.length - 1].id
    globalThis.fetch(`/customers?after=${after}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
  }, [customers])

  return (
    <>
      <NavigationButtons onNextButtonClick={onNextButtonClick} />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((aCustomer) => (
            <CustomerRow customer={aCustomer} key={aCustomer.id} />
          ))}
        </tbody>
      </table>
    </>
  )
}
