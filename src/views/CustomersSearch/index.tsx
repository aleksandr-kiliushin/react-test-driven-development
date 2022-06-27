import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { fetchAndSetCustomers } from "#store/customers-search"
import { ICustomer } from "#types/ICustomer"

import { CustomerRow } from "./CustomerRow"
import { NavigationButtons } from "./NavigationButtons"
import { isPageNumberSearchParamValid } from "./isPageNumberSearchParamValid"

export interface ICustomersSearchProps {
  renderCustomerActions(aCustomer: ICustomer): React.ReactNode
}

export const CustomersSearch: React.FC<ICustomersSearchProps> = ({ renderCustomerActions }) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const pageNumberSearchParam = searchParams.get("page")
  const searchTermSearchParam = searchParams.get("searchTerm")

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

  const customersFromStore = useSelector((state) => state.customersSearch.customers)
  React.useEffect(() => {
    if (!isPageNumberSearchParamValid(pageNumberSearchParam)) return
    dispatch(fetchAndSetCustomers({ pageNumberSearchParam, searchTermSearchParam }))
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
          {customersFromStore.map((aCustomer) => (
            <CustomerRow customer={aCustomer} key={aCustomer.id} renderCustomerActions={renderCustomerActions} />
          ))}
        </tbody>
      </table>
    </>
  )
}
