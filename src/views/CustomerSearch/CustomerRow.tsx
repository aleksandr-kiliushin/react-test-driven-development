import React from "react"

import { ICustomer } from "#types/ICustomer"

interface ICustomerRowProps {
  customer: ICustomer
}

export const CustomerRow: React.FC<ICustomerRowProps> = ({ customer }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
    <td />
  </tr>
)
