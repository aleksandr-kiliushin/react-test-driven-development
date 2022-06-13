import React from "react"

type Props = {
  firstName: string
  onSubmit(formValues: { firstName: string }): void
}

const CustomerForm: React.FC<Props> = ({ firstName, onSubmit }) => {
  const customer = { firstName }

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input id="firstName" name="firstName" readOnly type="text" value={firstName} />
    </form>
  )
}

export default CustomerForm
