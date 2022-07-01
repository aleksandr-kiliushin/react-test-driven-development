import React from "react"

import { ICustomer } from "#types/salon/ICustomer"

interface ICustomerRowProps {
  customer: ICustomer
  renderCustomerActions(aCustomer: ICustomer): React.ReactNode
}

export const CustomerRow: React.FC<ICustomerRowProps> = ({ customer, renderCustomerActions }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
    <td>{renderCustomerActions(customer)}</td>
  </tr>
)
