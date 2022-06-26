import React from "react"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { App } from "./App"

type ICustomersSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("App", () => {
  let findElement: ICustomersSearchRenderContainer["findElement"]
  let render: ICustomersSearchRenderContainer["render"]

  beforeEach(() => {
    ;({ findElement, render } = createContainer())
  })

  it("renders the add a customer page link", () => {
    render(<App />)
    expect(findElement("a[href='/add-a-customer']")).not.toBeNull()
  })

  it("renders the search customers page link", () => {
    render(<App />)
    expect(findElement("a[href='/customers-search']")).not.toBeNull()
  })
})
