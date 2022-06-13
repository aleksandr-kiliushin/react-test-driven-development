import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import AppointmentForm, { FieldName } from "./index"

describe("AppointmentForm", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  const findForm = ({ id }: { id: "appointment" }): HTMLFormElement => {
    const form = container.querySelector(`form#${id}`)
    assert(form !== null, "Expected to find a form instance, but found `null`")
    assert(form instanceof HTMLFormElement, "Found element is not a form.")
    return form
  }

  const findSelectField = ({ fieldName }: { fieldName: FieldName }): HTMLSelectElement => {
    const field = findForm({ id: "appointment" }).elements.namedItem(fieldName)
    assert(field instanceof HTMLSelectElement, "firstNameField is not a select")
    return field
  }

  it("renders a form.", async () => {
    render(<AppointmentForm />)
    await wait()
    expect(findForm({ id: "appointment" })).not.toBeNull()
  })

  describe("service field", () => {
    it("renders as a select box", async () => {
      render(<AppointmentForm />)
      await wait()
      expect(findSelectField({ fieldName: "serviceName" })).not.toBeNull()
    })
  })
})
