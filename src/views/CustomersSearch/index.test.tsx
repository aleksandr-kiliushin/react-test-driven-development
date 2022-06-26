import { createBrowserHistory } from "history"
import assert from "node:assert"
import React from "react"
import { act } from "react-dom/test-utils"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { aCustomer1, aCustomer2 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse } from "#utils/testing/spyHelpers"

import { CustomersSearch, ICustomersSearchProps } from "./index"

const twoCustomersResponse: ICustomer[] = [aCustomer1, aCustomer2]
const tenCustomersResponse = Array.from("0123456789", (id) => ({ id }))
// const anotherTenCustomersResponse = Array.from("ABCDEFGHIJ", (id) => ({ id }))

const customersSearchDefaultProps: ICustomersSearchProps = {
  renderCustomerActions() {
    return null
  },
}

type ICustomersSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("CustomersSearch", () => {
  let findElement: ICustomersSearchRenderContainer["findElement"]
  let findElements: ICustomersSearchRenderContainer["findElements"]
  // let findField: ICustomersSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomersSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomersSearchRenderContainer["findForm"]
  let queryElement: ICustomersSearchRenderContainer["queryElement"]
  let renderAndWait: ICustomersSearchRenderContainer["renderAndWait"]
  // let renderWithMemoryRouterAndWait: ICustomersSearchRenderContainer["renderWithMemoryRouterAndWait"]
  // let simulateBlur: ICustomersSearchRenderContainer["simulateBlur"]
  // let simulateChange: ICustomersSearchRenderContainer["simulateChange"]
  let simulateChangeAndWait: ICustomersSearchRenderContainer["simulateChangeAndWait"]
  // let simulateClick: ICustomersSearchRenderContainer["simulateClick"]
  // let simulateClickAndWait: ICustomersSearchRenderContainer["simulateClickAndWait"]
  // let simulateSubmit: ICustomersSearchRenderContainer["simulateSubmit"]
  // let simulateSubmitAndWait: ICustomersSearchRenderContainer["simulateSubmitAndWait"]

  beforeEach(() => {
    ;({
      findElement,
      findElements,
      // findField,
      // findFieldLabel,
      // findForm,
      queryElement,
      renderAndWait,
      // renderWithMemoryRouterAndWait,
      // simulateBlur,
      // simulateChange,
      simulateChangeAndWait,
      // simulateClick,
      // simulateClickAndWait,
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
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    const headings = findElements("table th")
    expect(headings.map((aHeader) => aHeader.textContent)).toEqual([
      "First name",
      "Last name",
      "Phone number",
      "Actions",
    ])
  })

  it("fetches first customer page when component mounts with no page specified", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    expect(globalThis.fetch).toHaveBeenCalledWith("/api/customers?page=1", expect.anything())
  })

  it("fetches first customer page when component mounts with page=5", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=5")
    })
    expect(globalThis.fetch).toHaveBeenLastCalledWith(`/api/customers?page=${5}`, expect.anything())
  })

  it("renders all customer data in a table row", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
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
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    expect(findElement("a#next-page")).not.toBeNull()
  })

  it("does not render the previous page link for the first page", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=1")
    })
    expect(queryElement("a#previous-page")).toBeNull()
  })

  it("render the previous page link if the page number is not 1", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=123")
    })
    expect(findElement("a#previous-page")).not.toBeNull()
  })

  it("sets page search param value to '1' if it is not defined", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    expect(history.location.pathname).toEqual("/customers-search")
    expect(history.location.search).toEqual("?page=1")
  })

  it("sets page search param value to '1' if it is zero", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=0")
    })
    expect(history.location.pathname).toEqual("/customers-search")
    expect(history.location.search).toEqual("?page=1")
  })

  it("sets page search param value to '1' if it is negative", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=-2")
    })
    expect(history.location.pathname).toEqual("/customers-search")
    expect(history.location.search).toEqual("?page=1")
  })

  it("sets page search param value to '1' if it is not a number", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=Hello")
    })
    expect(history.location.pathname).toEqual("/customers-search")
    expect(history.location.search).toEqual("?page=1")
  })

  it("does not change a page search param if it is already correct", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=6")
    })
    expect(history.location.pathname).toEqual("/customers-search")
    expect(history.location.search).toEqual("?page=6")
  })

  it("navigation links have proper hrefs", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=5")
    })
    const previousPageLink = findElement("a#previous-page")
    const nextPageLink = findElement("a#next-page")
    assert(previousPageLink !== null, "previous-page link not found")
    assert(nextPageLink !== null, "next-page link not found")
    assert(previousPageLink instanceof HTMLAnchorElement, "previous-page link is not an anchor element")
    assert(nextPageLink instanceof HTMLAnchorElement, "next-page link is not an anchor element")
    expect(previousPageLink.href).toMatch("/customers-search?page=4")
    expect(nextPageLink.href).toMatch("/customers-search?page=6")
  })

  it("navigation links have proper hrefs when searchTerm is specified", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=5&searchTerm=Gerald")
    })
    const previousPageLink = findElement("a#previous-page")
    const nextPageLink = findElement("a#next-page")
    assert(previousPageLink !== null, "previous-page link not found")
    assert(nextPageLink !== null, "next-page link not found")
    assert(previousPageLink instanceof HTMLAnchorElement, "previous-page link is not an anchor element")
    assert(nextPageLink instanceof HTMLAnchorElement, "next-page link is not an anchor element")
    expect(previousPageLink.href).toMatch("/customers-search?page=4&searchTerm=Gerald")
    expect(nextPageLink.href).toMatch("/customers-search?page=6&searchTerm=Gerald")
  })

  it("has a search input field with a placeholder", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    const searchField = findElement("input")
    assert(searchField !== null, "SearchField is not found.")
    expect(searchField.getAttribute("placeholder")).toEqual("Enter filter text")
  })

  it("performs search when search term is changed", async () => {
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    const searchField = findElement("input")
    assert(searchField !== null, "SearchField is not found.")
    // @ts-ignore
    await simulateChangeAndWait(searchField, { target: { value: "Gerald" } })
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers?page=1&searchTerm=Gerald", expect.anything())
  })

  it("resets page to page=1 after searchTerm was changed", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(tenCustomersResponse))
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=5")
    })
    const searchField = findElement("input")
    assert(searchField !== null, "SearchField is not found.")
    // @ts-ignore
    await simulateChangeAndWait(searchField, { target: { value: "Gerald" } })
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers?page=1&searchTerm=Gerald", expect.anything())
  })

  it("removes searchTerm searchParam if it equals an empty string", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(tenCustomersResponse))
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch {...customersSearchDefaultProps} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search?page=5&searchTerm=")
    })
    expect(history.location.pathname).toEqual("/customers-search")
    expect(history.location.search).toEqual("?page=5")
    expect(globalThis.fetch).toHaveBeenLastCalledWith("/api/customers?page=5", expect.anything())
  })

  it("displays provided action buttons for each customer", async () => {
    const actionSpy = jest.fn()
    actionSpy.mockReturnValue("actions")
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(twoCustomersResponse))
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch renderCustomerActions={actionSpy} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    const rows = findElements("table tbody td")
    expect(rows[rows.length - 1].textContent).toEqual("actions")
  })

  it("passes customer to the renderCustomerActions prop", async () => {
    const actionSpy = jest.fn()
    actionSpy.mockReturnValue("actions")
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(twoCustomersResponse))
    const history = createBrowserHistory() // TODO: Get it from render result of `createContainer`.
    await renderAndWait(
      <HistoryRouter history={history}>
        <CustomersSearch renderCustomerActions={actionSpy} />
      </HistoryRouter>
    )
    await act(async () => {
      history.push("/customers-search")
    })
    expect(actionSpy).toHaveBeenCalledWith(twoCustomersResponse[0])
  })
})
