import React from "react"

import { ErrorMessage } from "#components/ErrorMessage"
import { ICustomer } from "#types/ICustomer"

type IFieldName = keyof Omit<ICustomer, "id">

export interface ICustomerFormProps {
  initialCustomerData: Omit<ICustomer, "id">
  onCustomerCreated(responseData: unknown): void
}

export const CustomerForm: React.FC<ICustomerFormProps> = ({ initialCustomerData, onCustomerCreated }) => {
  const [firstName, setFirstName] = React.useState<string>(initialCustomerData.firstName)
  const [lastName, setLastName] = React.useState<string>(initialCustomerData.lastName)
  const [phoneNumber, setPhoneNumber] = React.useState<string>(initialCustomerData.phoneNumber)
  const [validationErrors, setValidationErrors] = React.useState<Record<IFieldName, string | undefined>>({
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
  })
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = { ...validationErrors }

    if (firstName.trim() === "") {
      errors.firstName = "Required."
    }
    if (lastName.trim() === "") {
      errors.lastName = "Required."
    }
    if (phoneNumber.trim() === "") {
      errors.phoneNumber = "Required."
    } else if (/^[0-9+()\- ]*$/.test(phoneNumber) === false) {
      errors.phoneNumber = "Only numbers, spaces and these symbols are allowed: ( ) + -."
    }

    if (Object.values(errors).some((aFieldError) => aFieldError !== undefined)) {
      setValidationErrors(errors)
      return
    }

    const response = await fetch("/api/customers", {
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
    if (response.ok === false) {
      setErrorMessage("An error occurred during save.")
      const serverErrors = (await response.json()).errors
      for (const fieldName in serverErrors) {
        errors[fieldName as IFieldName] = serverErrors[fieldName as IFieldName]
      }
      setValidationErrors(errors)
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
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          name="lastName"
          onBlur={(event) => {
            if (event.target.value.trim() === "") {
              setValidationErrors({ ...validationErrors, lastName: "Required." })
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
