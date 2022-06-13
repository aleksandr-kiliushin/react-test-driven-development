import React from "react"

type Props = {
  firstName: string
  onSubmit(formValues: { firstName: string }): void
}

const CustomerForm: React.FC<Props> = ({ firstName, onSubmit }) => {
  const [customer, setCustomer] = React.useState({ firstName })

  const onCustomerFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCustomer({ ...customer, firstName: event.target.value })
  }

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input id="firstName" name="firstName" onChange={onCustomerFirstNameChange} type="text" value={firstName} />
    </form>
  )
}

export default CustomerForm
