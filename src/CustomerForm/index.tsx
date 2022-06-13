import React from "react"

type Props = {
  firstName: string
}

const CustomerForm: React.FC<Props> = ({ firstName }) => {
  return (
    <form id="customer">
      <label htmlFor="firstName">First name</label>
      <input id="firstName" name="firstName" readOnly type="text" value={firstName} />
    </form>
  )
}

export default CustomerForm
