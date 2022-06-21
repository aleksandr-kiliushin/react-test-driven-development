import React from "react"

import { ICustomer } from "#types/ICustomer"

import { CustomerRow } from "./CustomerRow"
import { NavigationButtons } from "./NavigationButtons"

export const CustomerSearch: React.FC = () => {
  const [customers, setCustomers] = React.useState<ICustomer[]>([])
  const [queryStrings, setQueryStrings] = React.useState<string[]>([])
  const [searchTerm, setSearchTerm] = React.useState<string>("")

  React.useEffect(() => {
    const fetchData = async () => {
      let queryString = ""
      if (searchTerm !== "") {
        queryString = `?searchTerm=${searchTerm}`
      } else if (queryStrings.length > 0) queryString = queryStrings[queryStrings.length - 1]
      const result = await globalThis.fetch(`/customers${queryString}`, {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
      setCustomers(await result.json())
    }
    fetchData()
  }, [queryStrings, searchTerm])

  const onNextButtonClick = React.useCallback(() => {
    const after = customers[customers.length - 1].id
    const queryString = `?after=${after}`
    setQueryStrings([...queryStrings, queryString])
  }, [customers, queryStrings])

  const onPreviousButtonClick = React.useCallback(() => {
    setQueryStrings(queryStrings.slice(0, -1))
  }, [queryStrings])

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
            <CustomerRow customer={aCustomer} key={aCustomer.id} />
          ))}
        </tbody>
      </table>
    </>
  )
}
