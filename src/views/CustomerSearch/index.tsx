import React from "react"

import { ICustomer } from "#types/ICustomer"

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

  return (
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
          <tr key={aCustomer.id}>
            <td>{aCustomer.firstName}</td>
            <td>{aCustomer.lastName}</td>
            <td>{aCustomer.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
