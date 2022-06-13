import assert from "assert"
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

  const findForm = ({ id }: { id: string }): HTMLFormElement => {
    const form = container.querySelector(`form#${id}`)
    assert(form instanceof HTMLFormElement, "Found element is not a form.")
    return form
  }

  it("renders a form.", async () => {
    render(<CustomerForm />)
    await wait()

    expect(findForm({ id: "customer" })).not.toBeNull()
  })

  it("renders the first name field as a text box", async () => {
    render(<CustomerForm />)
    await wait()

    const form = findForm({ id: "customer" })

    const firstNameField = form.elements.namedItem("firstName")

    assert(firstNameField instanceof HTMLInputElement, "firstNameField is not an input")
    expect(firstNameField.type).toEqual("text")
  })
})
