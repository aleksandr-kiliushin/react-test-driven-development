import React from "react"

import { ErrorMessage } from "#components/ErrorMessage"
import { ICustomer } from "#types/ICustomer"

export interface ICustomerFormProps {
  initialCustomerData: ICustomer
  onCustomerCreated(responseData: unknown): void
}

export const CustomerForm: React.FC<ICustomerFormProps> = ({ initialCustomerData, onCustomerCreated }) => {
  const [firstName, setFirstName] = React.useState<string>(initialCustomerData.firstName)
  const [lastName, setLastName] = React.useState<string>(initialCustomerData.lastName)
  const [phoneNumber, setPhoneNumber] = React.useState<string>(initialCustomerData.phoneNumber)
  const [validationErrors, setValidationErrors] = React.useState<Partial<Record<keyof ICustomer, string | undefined>>>({
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
  })
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch("/api/customers", {
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
  }

  return (
    <form className="grid gap-y-4" id="customer" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          onBlur={(event) => {
            if (event.target.value.trim() === "") {
              setValidationErrors({ ...validationErrors, firstName: "Required." })
            }
          }}
          onChange={(event) => {
            setFirstName(event.target.value)
          }}
          type="text"
          value={firstName}
        />
        <ErrorMessage message={validationErrors.firstName} />
        {validationErrors.firstName !== undefined && <p className="error text-red-700">{validationErrors.firstName}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          onBlur={(event) => {
            if (event.target.value.trim() === "") {
              setValidationErrors({ ...validationErrors, firstName: "Required." })
            }
          }}
          onChange={(event) => {
            setLastName(event.target.value)
          }}
          type="text"
          value={lastName}
        />
        <ErrorMessage message={validationErrors.lastName} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          onBlur={(event) => {
            if (event.target.value.trim() === "") {
              setValidationErrors({ ...validationErrors, phoneNumber: "Required." })
              return
            }
            if (/^[0-9+()\- ]*$/.test(event.target.value) === false) {
              setValidationErrors({
                ...validationErrors,
                phoneNumber: "Only numbers, spaces and these symbols are allowed: ( ) + -.",
              })
            }
          }}
          onChange={(event) => {
            setPhoneNumber(event.target.value)
          }}
          type="text"
          value={phoneNumber}
        />
        <ErrorMessage message={validationErrors.phoneNumber} />
      </div>
      <input type="submit" value="Add" />
      <ErrorMessage message={errorMessage} />
    </form>
  )
}
