import React from "react"
import { useSearchParams } from "react-router-dom"

import { ICustomer } from "#types/ICustomer"

import { CustomerRow } from "./CustomerRow"
import { NavigationButtons } from "./NavigationButtons"
import { isPageNumberSearchParamValid } from "./isPageNumberSearchParamValid"

export interface ICustomersSearchProps {
  renderCustomerActions(aCustomer: ICustomer): React.ReactNode
}

export const CustomersSearch: React.FC<ICustomersSearchProps> = ({ renderCustomerActions }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageNumberSearchParam = searchParams.get("page")
  const searchTermSearchParam = searchParams.get("searchTerm")

  const [customers, setCustomers] = React.useState<ICustomer[]>([])

  React.useEffect(() => {
    if (isPageNumberSearchParamValid(pageNumberSearchParam)) return
    setSearchParams({
      page: "1",
      ...(searchTermSearchParam ? { searchTerm: searchTermSearchParam } : {}),
    })
  }, [pageNumberSearchParam])

  React.useEffect(() => {
    if (searchTermSearchParam !== "") return
    setSearchParams({ page: pageNumberSearchParam || "1" })
  }, [searchTermSearchParam])

  React.useEffect(() => {
    if (!isPageNumberSearchParamValid(pageNumberSearchParam)) return
    globalThis
      .fetch(
        `/api/customers?page=${pageNumberSearchParam}${
          searchTermSearchParam ? `&searchTerm=${searchTermSearchParam}` : ""
        }`,
        {
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          method: "GET",
        }
      )
      .then((response) => response.json())
      .then(setCustomers)
  }, [pageNumberSearchParam, searchTermSearchParam])

  return (
    <>
      <input
        onChange={(event) => {
          setSearchParams({ page: "1", searchTerm: event.target.value })
        }}
        placeholder="Enter filter text"
        value={searchTermSearchParam ?? ""}
      />
      <NavigationButtons />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((aCustomer) => (
            <CustomerRow customer={aCustomer} key={aCustomer.id} renderCustomerActions={renderCustomerActions} />
          ))}
        </tbody>
      </table>
    </>
  )
}
