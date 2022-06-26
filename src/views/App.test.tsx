import React from "react"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { App } from "./App"

type ICustomersSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("App", () => {
  let findElement: ICustomersSearchRenderContainer["findElement"]
  // let findElements: ICustomersSearchRenderContainer["findElements"]
  // let findField: ICustomersSearchRenderContainer["findField"]
  // let findFieldLabel: ICustomersSearchRenderContainer["findFieldLabel"]
  // let findForm: ICustomersSearchRenderContainer["findForm"]
  let renderWithMemoryRouter: ICustomersSearchRenderContainer["renderWithMemoryRouter"]
  // let renderAndWait: ICustomersSearchRenderContainer["renderAndWait"]
  // let simulateBlur: ICustomersSearchRenderContainer["simulateBlur"]
  // let simulateChange: ICustomersSearchRenderContainer["simulateChange"]
  // let simulateChangeAndWait: ICustomersSearchRenderContainer["simulateChangeAndWait"]
  // let simulateClickAndWait: ICustomersSearchRenderContainer["simulateClickAndWait"]
  // let simulateSubmit: ICustomersSearchRenderContainer["simulateSubmit"]
  // let simulateSubmitAndWait: ICustomersSearchRenderContainer["simulateSubmitAndWait"]

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
