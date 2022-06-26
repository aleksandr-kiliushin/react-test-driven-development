import assert from "node:assert"
import React from "react"

import { aCustomer1, aCustomer2 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { CustomerSearch, ICustomerSearchProps } from "./index"

const twoCustomersResponse: ICustomer[] = [aCustomer1, aCustomer2]
const tenCustomersResponse = Array.from("0123456789", (id) => ({ id }))
const anotherTenCustomersResponse = Array.from("ABCDEFGHIJ", (id) => ({ id }))

const customerSearchDefaultProps: ICustomerSearchProps = {
  renderCustomerActions() {
    return null
  },
}

type ICustomerSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("CustomerSearch", () => {
  let findElement: ICustomerSearchRenderContainer["findElement"]
  let findElements: ICustomerSearchRenderContainer["findElements"]
  // let findField: ICustomerSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomerSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomerSearchRenderContainer["findForm"]
  let renderWithMemoryRouterAndWait: ICustomerSearchRenderContainer["renderWithMemoryRouterAndWait"]
  // let simulateBlur: ICustomerSearchRenderContainer["simulateBlur"]
  // let simulateChange: ICustomerSearchRenderContainer["simulateChange"]
  let simulateChangeAndWait: ICustomerSearchRenderContainer["simulateChangeAndWait"]
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
      renderWithMemoryRouterAndWait,
      // simulateBlur,
      // simulateChange,
      simulateChangeAndWait,
      simulateClickAndWait,
      // simulateSubmit,
      // simulateSubmitAndWait,
    } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse())
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(twoCustomersResponse))
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

  it("renders a table with four headings", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const headings = findElements("table th")
    expect(headings.map((aHeader) => aHeader.textContent)).toEqual([
      "First name",
      "Last name",
      "Phone number",
      "Actions",
    ])
  })

  it("fetches all customer data when component mounts", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/customers", {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
  })

  it("renders all customer data in a table row", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const aCustomer1RowCells = findElements("table tbody tr:nth-child(1) td")
    expect(aCustomer1RowCells[0].textContent).toEqual(aCustomer1.firstName)
    expect(aCustomer1RowCells[1].textContent).toEqual(aCustomer1.lastName)
    expect(aCustomer1RowCells[2].textContent).toEqual(aCustomer1.phoneNumber)
    const aCustomer2RowCells = findElements("table tbody tr:nth-child(2) td")
    expect(aCustomer2RowCells[0].textContent).toEqual(aCustomer2.firstName)
    expect(aCustomer2RowCells[1].textContent).toEqual(aCustomer2.lastName)
    expect(aCustomer2RowCells[2].textContent).toEqual(aCustomer2.phoneNumber)
  })

  it("has a next page link", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    expect(findElement("a#next-page")).not.toBeNull()
  })

  it("requests next page of data when next page link is clicked", async () => {
    const lastLoadedCustomerId = 9
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(tenCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const nextPageLink = findElement("a#next-page")
    assert(nextPageLink !== null, "Next page link not found.")
    await simulateClickAndWait(nextPageLink)
    expect(globalThis.fetch).toHaveBeenLastCalledWith(`/api/customers?after=${lastLoadedCustomerId}`, expect.anything())
  })

  it("has a previous page link", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    expect(findElement("a#previous-page")).not.toBeNull()
  })

  it("moves back to first page when previous page link is clicked", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(tenCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const nextPageLink = findElement("a#next-page")
    const previousPageLink = findElement("a#previous-page")
    assert(nextPageLink !== null, "next-page link not found")
    assert(previousPageLink !== null, "previous-page link not found")
    await simulateClickAndWait(nextPageLink)
    await simulateClickAndWait(previousPageLink)
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers", expect.anything())
  })

  it("moves back one page when clicking previous after multiple clicks of the next link", async () => {
    ;(globalThis.fetch as jest.Mock)
      .mockReturnValueOnce(createFetchSuccessfulResponse(tenCustomersResponse))
      .mockReturnValue(createFetchSuccessfulResponse(anotherTenCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const nextPageLink = findElement("a#next-page")
    const previousPageLink = findElement("a#previous-page")
    assert(nextPageLink !== null, "next-page link not found")
    assert(previousPageLink !== null, "previous-page link not found")
    await simulateClickAndWait(nextPageLink)
    await simulateClickAndWait(nextPageLink)
    await simulateClickAndWait(previousPageLink)
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers?after=9", expect.anything())
  })

  it("moves back multiple pages", async () => {
    ;(globalThis.fetch as jest.Mock)
      .mockReturnValueOnce(createFetchSuccessfulResponse(tenCustomersResponse))
      .mockReturnValue(createFetchSuccessfulResponse(anotherTenCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const nextPageLink = findElement("a#next-page")
    const previousPageLink = findElement("a#previous-page")
    assert(nextPageLink !== null, "next-page link not found")
    assert(previousPageLink !== null, "previous-page link not found")
    await simulateClickAndWait(nextPageLink)
    await simulateClickAndWait(nextPageLink)
    await simulateClickAndWait(previousPageLink)
    await simulateClickAndWait(previousPageLink)
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers", expect.anything())
  })

  it("has a search input field with a placeholder", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const searchField = findElement("input")
    assert(searchField !== null, "SearchField is not found.")
    expect(searchField.getAttribute("placeholder")).toEqual("Enter filter text")
  })

  it("performs search when search term is changed", async () => {
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const searchField = findElement("input")
    assert(searchField !== null, "SearchField is not found.")
    // @ts-ignore
    await simulateChangeAndWait(searchField, { target: { value: "name" } })
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers?searchTerm=name", expect.anything())
  })

  it("includes search term when moving to next page", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(tenCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch {...customerSearchDefaultProps} />)
    const searchField = findElement("input")
    const nextPageLink = findElement("a#next-page")
    assert(searchField !== null, "SearchField is not found.")
    assert(nextPageLink !== null, "next-page link not found")
    // @ts-ignore
    await simulateChangeAndWait(searchField, { target: { value: "name" } })
    await simulateClickAndWait(nextPageLink)
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers?after=9&searchTerm=name", expect.anything())
  })

  it("displays provided action buttons for each customer", async () => {
    const actionSpy = jest.fn()
    actionSpy.mockReturnValue("actions")
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(twoCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch renderCustomerActions={actionSpy} />)
    const rows = findElements("table tbody td")
    expect(rows[rows.length - 1].textContent).toEqual("actions")
  })

  it("passes customer to the renderCustomerActions prop", async () => {
    const actionSpy = jest.fn()
    actionSpy.mockReturnValue("actions")
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(twoCustomersResponse))
    await renderWithMemoryRouterAndWait(<CustomerSearch renderCustomerActions={actionSpy} />)
    expect(actionSpy).toHaveBeenCalledWith(twoCustomersResponse[0])
  })
})
