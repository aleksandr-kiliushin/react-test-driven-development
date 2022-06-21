import assert from "node:assert"
import React from "react"
import "whatwg-fetch"

import { aCustomer1, aCustomer2 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { CustomerSearch } from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

const customersResponse: ICustomer[] = [aCustomer1, aCustomer2]
const tenCustomersResponse = Array.from("0123456789", (id) => ({ id }))

type ICustomerSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("CustomerSearch", () => {
  let findElement: ICustomerSearchRenderContainer["findElement"]
  let findElements: ICustomerSearchRenderContainer["findElements"]
  // let findField: ICustomerSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomerSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomerSearchRenderContainer["findForm"]
  let renderAndWait: ICustomerSearchRenderContainer["renderAndWait"]
  // let simulateBlur: ICustomerSearchRenderContainer["simulateBlur"]
  // let simulateChange: ICustomerSearchRenderContainer["simulateChange"]
  let simulateClickAndWait: ICustomerSearchRenderContainer["simulateClickAndWait"]
  // let simulateSubmit: ICustomerSearchRenderContainer["simulateSubmit"]
  // let simulateSubmitAndWait: ICustomerSearchRenderContainer["simulateSubmitAndWait"]

  beforeEach(() => {
    ;({
      findElement,
      findElements,
      // findField,
      // findFieldLabel,
      // findForm,
      renderAndWait,
      // simulateBlur,
      // simulateChange,
      simulateClickAndWait,
      // simulateSubmit,
      // simulateSubmitAndWait,
    } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse())
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(customersResponse))
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

  it("renders a table with four headings", async () => {
    await renderAndWait(<CustomerSearch />)
    const headings = findElements("table th")
    expect(headings.map((aHeader) => aHeader.textContent)).toEqual([
      "First name",
      "Last name",
      "Phone number",
      "Actions",
    ])
  })

  it("fetches all customer data when component mounts", async () => {
    await renderAndWait(<CustomerSearch />)
    expect(globalThis.fetch).toHaveBeenCalledWith("/customers", {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
  })

  it("renders all customer data in a table row", async () => {
    await renderAndWait(<CustomerSearch />)
    const aCustomer1RowCells = findElements("table tbody tr:nth-child(1) td")
    expect(aCustomer1RowCells[0].textContent).toEqual(aCustomer1.firstName)
    expect(aCustomer1RowCells[1].textContent).toEqual(aCustomer1.lastName)
    expect(aCustomer1RowCells[2].textContent).toEqual(aCustomer1.phoneNumber)
    const aCustomer2RowCells = findElements("table tbody tr:nth-child(2) td")
    expect(aCustomer2RowCells[0].textContent).toEqual(aCustomer2.firstName)
    expect(aCustomer2RowCells[1].textContent).toEqual(aCustomer2.lastName)
    expect(aCustomer2RowCells[2].textContent).toEqual(aCustomer2.phoneNumber)
  })

  it("has a next button", async () => {
    await renderAndWait(<CustomerSearch />)
    expect(findElement("button#next-page")).not.toBeNull()
  })

  it("requests next page of data when next button is clicked", async () => {
    const lastLoadedCustomerId = 9
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(tenCustomersResponse))
    await renderAndWait(<CustomerSearch />)
    const nextPageButton = findElement("button#next-page")
    assert(nextPageButton !== null, "Next page button not found.")
    await simulateClickAndWait(nextPageButton)
    expect(globalThis.fetch).toHaveBeenLastCalledWith(`/customers?after=${lastLoadedCustomerId}`, expect.anything())
  })
})