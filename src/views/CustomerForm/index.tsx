import React from "react"

import { ICustomer } from "#types/ICustomer"

interface Props {
  initialCustomerData: ICustomer
  onSubmit(formValues: ICustomer): void
}

export const CustomerForm: React.FC<Props> = ({ initialCustomerData, onSubmit }) => {
  const [firstName, setFirstName] = React.useState<string>(initialCustomerData.firstName)
  const [lastName, setLastName] = React.useState<string>(initialCustomerData.lastName)
  const [phoneNumber, setPhoneNumber] = React.useState<string>(initialCustomerData.phoneNumber)

  return (
    <form
      id="customer"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ firstName, lastName, phoneNumber })
      }}
    >
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={(event) => setFirstName(event.target.value)}
        type="text"
        value={firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={(event) => setLastName(event.target.value)}
        type="text"
        value={lastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        onChange={(event) => setPhoneNumber(event.target.value)}
        type="text"
        value={phoneNumber}
      />
      <input type="submit" value="Add" />
    </form>
  )
}
