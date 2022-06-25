import React from "react"
import { MemoryRouter } from "react-router-dom"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { App } from "./App"

type ICustomerSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("App", () => {
  let findElement: ICustomerSearchRenderContainer["findElement"]
  // let findElements: ICustomerSearchRenderContainer["findElements"]
  // let findField: ICustomerSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomerSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomerSearchRenderContainer["findForm"]
  let render: ICustomerSearchRenderContainer["render"]
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
      render,
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
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(findElement("a[href='/add-a-customer']")).not.toBeNull()
  })

  it("renders the search customers page link", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(findElement("a[href='/customers-search']")).not.toBeNull()
  })
})
