import React from "react"
import "whatwg-fetch"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { CustomerSearch } from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

const customersResponse: ICustomer[] = [aCustomer1]

type ICustomerSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("CustomerSearch", () => {
  // let findElement: ICustomerSearchRenderContainer["findElement"]
  let findElements: ICustomerSearchRenderContainer["findElements"]
  // let findField: ICustomerSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomerSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomerSearchRenderContainer["findForm"]
  let renderAndWait: ICustomerSearchRenderContainer["renderAndWait"]
  // let simulateBlur: ICustomerSearchRenderContainer["simulateBlur"]
  // let simulateChange: ICustomerSearchRenderContainer["simulateChange"]
  // let simulateSubmit: ICustomerSearchRenderContainer["simulateSubmit"]
  // let simulateSubmitAndWait: ICustomerSearchRenderContainer["simulateSubmitAndWait"]

  beforeEach(() => {
    ;({
      // findElement,
      findElements,
      // findField,
      // findFieldLabel,
      // findForm,
      renderAndWait,
      // simulateBlur,
      // simulateChange,
      // simulateSubmit,
      // simulateSubmitAndWait,
    } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse())
    ;(globalThis.fetch as jest.Mock).mockReturnValueOnce(createFetchSuccessfulResponse(customersResponse))
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
    const columns = findElements("table tbody td")
    expect(columns[0].textContent).toEqual(aCustomer1.firstName)
    expect(columns[1].textContent).toEqual(aCustomer1.lastName)
    expect(columns[2].textContent).toEqual(aCustomer1.phoneNumber)
  })
})
