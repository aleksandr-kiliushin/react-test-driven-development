import React from "react"
import ReactDom from "react-dom/client"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import CustomerForm from "./index"

describe("CustomerForm", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  it("renders a form.", async () => {
    render(<CustomerForm />)
    await wait()

    expect(container.querySelector("form[id='customer']")).not.toBeNull
  })
})
