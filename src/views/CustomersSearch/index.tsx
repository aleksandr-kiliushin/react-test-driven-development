import React from "react"
import { useSearchParams } from "react-router-dom"

import { ICustomer } from "#types/ICustomer"

import { CustomerRow } from "./CustomerRow"
import { NavigationButtons } from "./NavigationButtons"
import { isPageNumberSearchParamValid } from "./isPageNumberSearchParamValid"

const getSearchParams = ({ after, searchTerm }: { after: ICustomer["id"]; searchTerm: string }) => {
  let pairs = []
  if (after) pairs.push(`after=${after}`)
  if (searchTerm) pairs.push(`searchTerm=${searchTerm}`)
  if (pairs.length > 0) return `?${pairs.join("&")}`
  return ""
}

export interface ICustomersSearchProps {
  renderCustomerActions(aCustomer: ICustomer): React.ReactNode
}

export const CustomersSearch: React.FC<ICustomersSearchProps> = ({ renderCustomerActions }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageNumberSearchParam = searchParams.get("page")

  const [customers, setCustomers] = React.useState<ICustomer[]>([])
  const [lastRowIds, setLastRowIds] = React.useState<number[]>([])
  const [searchTerm, setSearchTerm] = React.useState<string>("")

  React.useEffect(() => {
    if (isPageNumberSearchParamValid(pageNumberSearchParam)) return
    setSearchParams({ page: "1" })
  }, [pageNumberSearchParam])

  React.useEffect(() => {
    const fetchData = async () => {
      let after = 0
      if (lastRowIds.length > 0) after = lastRowIds[lastRowIds.length - 1]
      const queryString = getSearchParams({ after, searchTerm })
      const result = await globalThis.fetch(`/api/customers${queryString}`, {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
      setCustomers(await result.json())
    }
    fetchData()
  }, [lastRowIds, searchTerm])

  const onNextButtonClick = React.useCallback(() => {
    const currentLastRowId = customers[customers.length - 1].id
    setLastRowIds([...lastRowIds, currentLastRowId])
  }, [customers, lastRowIds])

  const onPreviousButtonClick = React.useCallback(() => {
    setLastRowIds(lastRowIds.slice(0, -1))
  }, [lastRowIds])

  return (
    <>
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
        placeholder="Enter filter text"
        value={searchTerm}
      />
      <NavigationButtons onNextButtonClick={onNextButtonClick} onPreviousButtonClick={onPreviousButtonClick} />
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
