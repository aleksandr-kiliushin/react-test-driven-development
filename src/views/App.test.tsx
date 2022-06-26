import React from "react"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { App } from "./App"

type ICustomerSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("App", () => {
  let findElement: ICustomerSearchRenderContainer["findElement"]
  // let findElements: ICustomerSearchRenderContainer["findElements"]
  // let findField: ICustomerSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomerSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomerSearchRenderContainer["findForm"]
  let renderWithMemoryRouter: ICustomerSearchRenderContainer["renderWithMemoryRouter"]
  // let renderAndWait: ICustomerSearchRenderContainer["renderAndWait"]
  // let simulateBlur: ICustomerSearchRenderContainer["simulateBlur"]
  // let simulateChange: ICustomerSearchRenderContainer["simulateChange"]
  // let simulateChangeAndWait: ICustomerSearchRenderContainer["simulateChangeAndWait"]
  // let simulateClickAndWait: ICustomerSearchRenderContainer["simulateClickAndWait"]
  // let simulateSubmit: ICustomerSearchRenderContainer["simulateSubmit"]
  // let simulateSubmitAndWait: ICustomerSearchRenderContainer["simulateSubmitAndWait"]

  beforeEach(() => {
    ;({
      findElement,
      // findElements,
      // findField,
      // findFieldLabel,
      // findForm,
      renderWithMemoryRouter,
      // renderAndWait,
      // simulateBlur,
      // simulateChange,
      // simulateChangeAndWait,
      // simulateClickAndWait,
      // simulateSubmit,
      // simulateSubmitAndWait,
    } = createContainer())
  })

  it("renders the add a customer page link", () => {
    renderWithMemoryRouter(<App />)
    expect(findElement("a[href='/add-a-customer']")).not.toBeNull()
  })

  it("renders the search customers page link", () => {
    renderWithMemoryRouter(<App />)
    expect(findElement("a[href='/customers-search']")).not.toBeNull()
  })
})
