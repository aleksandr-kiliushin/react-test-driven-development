import React from "react"

import { ErrorMessage } from "#components/ErrorMessage"
import { ICustomer } from "#types/ICustomer"

type IFieldName = keyof Omit<ICustomer, "id">

export interface ICustomerFormProps {
  initialCustomerData: Omit<ICustomer, "id">
  onCustomerCreated(responseData: ICustomer): void
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

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

    setIsLoading(true)

    const response = await fetch("/api/customers", {
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
    if (response.ok === false && response.status === 500) {
      setErrorMessage("An error occurred during save.")
      setValidationErrors(errors)
      return
    }
    if (response.ok === false && response.status !== 500) {
      const serverErrors = await response.json()
      for (const fieldName in serverErrors) {
        errors[fieldName as IFieldName] = serverErrors[fieldName as IFieldName]
      }
      setValidationErrors(errors)
      return
    }
    setIsLoading(false)
    setErrorMessage("")
    const createdCustomer: ICustomer = await response.json()
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
            if (event.target.value.trim() !== "" && validationErrors.firstName === "Required.") {
              setValidationErrors({ ...validationErrors, firstName: undefined })
            }
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
            if (event.target.value.trim() !== "" && validationErrors.lastName === "Required.") {
              setValidationErrors({ ...validationErrors, lastName: undefined })
            }
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
            if (event.target.value.trim() !== "" && validationErrors.phoneNumber === "Required.") {
              setValidationErrors({ ...validationErrors, phoneNumber: undefined })
            }
            if (
              /^[0-9+()\- ]*$/.test(event.target.value) &&
              validationErrors.phoneNumber?.startsWith("Only numbers,")
            ) {
              setValidationErrors({ ...validationErrors, phoneNumber: undefined })
            }
            setPhoneNumber(event.target.value)
          }}
          type="text"
          value={phoneNumber}
        />
        <ErrorMessage message={validationErrors.phoneNumber} />
      </div>
      <input type="submit" value="Add" />
      {isLoading && <p className="loader">Loading ...</p>}
      <ErrorMessage message={errorMessage} />
    </form>
  )
}
