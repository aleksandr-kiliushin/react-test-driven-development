import React from "react"

type Props = {
  firstName: string
}

const CustomerForm: React.FC<Props> = ({ firstName }) => {
  return (
    <form id="customer">
      <input name="firstName" readOnly type="text" value={firstName} />
    </form>
  )
}

export default CustomerForm
