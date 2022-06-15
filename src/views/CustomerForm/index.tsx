import React from "react"

import { ICustomer } from "#types/ICustomer"

interface Props {
  firstName: ICustomer["firstName"]
  lastName: ICustomer["lastName"]
  onSubmit(formValues: { firstName: string; lastName: string; phoneNumber: string }): void
  phoneNumber: ICustomer["phoneNumber"]
}

export const CustomerForm: React.FC<Props> = ({ firstName, lastName, onSubmit, phoneNumber }) => {
  const [customerFirstName, setCustomerFirstName] = React.useState<string>(firstName)
  const [customerLastName, setCustomerLastName] = React.useState<string>(lastName)
  const [customerPhoneNumber, setCustomerPhoneNumber] = React.useState<string>(phoneNumber)

  return (
    <form
      id="customer"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ firstName: customerFirstName, lastName: customerLastName, phoneNumber: customerPhoneNumber })
      }}
    >
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={(event) => setCustomerFirstName(event.target.value)}
        type="text"
        value={customerFirstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={(event) => setCustomerLastName(event.target.value)}
        type="text"
        value={customerLastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        onChange={(event) => setCustomerPhoneNumber(event.target.value)}
        type="text"
        value={customerPhoneNumber}
      />
      <input type="submit" value="Add" />
    </form>
  )
}
