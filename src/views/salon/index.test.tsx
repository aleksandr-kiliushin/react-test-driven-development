import React from "react"

import { IRenderContainer, createContainer } from "#utils/testing/createContainer"

import { Salon } from "./index"

type ICustomersSearchRenderContainer = IRenderContainer<{ formIds: []; fieldNames: [] }>

describe("Salon", () => {
  let findElement: ICustomersSearchRenderContainer["findElement"]
  let render: ICustomersSearchRenderContainer["render"]

  beforeEach(() => {
    ;({ findElement, render } = createContainer())
  })

  it("renders the add a customer page link", () => {
    render(<Salon />)
    expect(findElement("a[href='/salon/add-a-customer']")).not.toBeNull()
  })

  it("renders the search customers page link", () => {
    render(<Salon />)
    expect(findElement("a[href='/salon/customers-search']")).not.toBeNull()
  })
})
