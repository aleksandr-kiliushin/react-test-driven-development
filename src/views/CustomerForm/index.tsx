import React from "react"

import { ICustomer } from "#types/ICustomer"

export interface ICustomerFormProps {
  initialCustomerData: ICustomer
  onCustomerCreated(responseData: unknown): void
}

export const CustomerForm: React.FC<ICustomerFormProps> = ({ initialCustomerData, onCustomerCreated }) => {
  const [firstName, setFirstName] = React.useState<string>(initialCustomerData.firstName)
  const [lastName, setLastName] = React.useState<string>(initialCustomerData.lastName)
  const [phoneNumber, setPhoneNumber] = React.useState<string>(initialCustomerData.phoneNumber)
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch("/customers", {
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
    if (response.ok === false) {
      setErrorMessage("An error occurred during save.")
      return
    }
    const createdCustomer = await response.json()
    setErrorMessage("")
    onCustomerCreated(createdCustomer)
    // onCustomerCreated({ firstName, lastName, phoneNumber })
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
      <input type="submit" value="Add" />
      {errorMessage !== "" && <p className="error text-red-700">{errorMessage}</p>}
    </form>
  )
}
