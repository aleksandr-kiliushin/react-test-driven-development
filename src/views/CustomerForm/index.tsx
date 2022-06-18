import React from "react"

import { ICustomer } from "#types/ICustomer"

interface ICustomerFormProps {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<any>
  initialCustomerData: ICustomer
  onSubmit(formValues: ICustomer): void
}

export const CustomerForm: React.FC<ICustomerFormProps> = ({ fetch, initialCustomerData, onSubmit }) => {
  const [firstName, setFirstName] = React.useState<string>(initialCustomerData.firstName)
  const [lastName, setLastName] = React.useState<string>(initialCustomerData.lastName)
  const [phoneNumber, setPhoneNumber] = React.useState<string>(initialCustomerData.phoneNumber)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ firstName, lastName, phoneNumber })
    fetch("/customers", {
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
  }

  return (
    <form className="grid gap-y-4" id="customer" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
          type="text"
          value={firstName}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
          type="text"
          value={lastName}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          onChange={(event) => setPhoneNumber(event.target.value)}
          type="text"
          value={phoneNumber}
        />
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  )
}
