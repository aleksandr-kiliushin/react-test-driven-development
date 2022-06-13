import React from "react"

type Props = {}

const CustomerForm: React.FC<Props> = () => {
  return (
    <form id="customer">
      <input name="firstName" type="text" />
    </form>
  )
}

export default CustomerForm
