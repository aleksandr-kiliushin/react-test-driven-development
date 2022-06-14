import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import AppointmentForm, { FieldName } from "./index"

const availableServiceNames = ["Cut", "Blow-dry"]

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

  const findSelectOption = ({
    optionTextContent,
    selectFieldName,
  }: {
    optionTextContent: string
    selectFieldName: FieldName
  }): HTMLOptionElement => {
    const selectField = findSelectField({ fieldName: selectFieldName })
    const options = Array.from(selectField.children)
    const foundOption = options.find((option) => option.textContent === optionTextContent)
    assert(foundOption !== undefined, `An option with specified textContent (${optionTextContent}) not found.`)
    assert(
      foundOption instanceof HTMLOptionElement,
      `An element with specified textContent (${optionTextContent}) is not a select option.`
    )
    return foundOption
  }

  it("renders a form.", async () => {
    render(<AppointmentForm availableServiceNames={[]} defaultServiceName="" />)
    await wait()
    expect(findForm({ id: "appointment" })).not.toBeNull()
  })

  describe("service field", () => {
    it("renders as a select box", async () => {
      render(<AppointmentForm availableServiceNames={[]} defaultServiceName="" />)
      await wait()
      expect(findSelectField({ fieldName: "serviceName" })).not.toBeNull()
    })

    it("lists all salon services", async () => {
      render(<AppointmentForm availableServiceNames={availableServiceNames} defaultServiceName="" />)
      await wait()
      const optionNodes = Array.from(findSelectField({ fieldName: "serviceName" }).childNodes)
      const renderedServices = optionNodes.map((node) => node.textContent)
      expect(renderedServices).toEqual(expect.arrayContaining(availableServiceNames))
    })

    it("pre-selects the existing value", async () => {
      const defaultServiceName = "Blow-dry"
      render(<AppointmentForm availableServiceNames={availableServiceNames} defaultServiceName={defaultServiceName} />)
      await wait()
      const selectOption = findSelectOption({ optionTextContent: "Blow-dry", selectFieldName: "serviceName" })
      expect(selectOption.textContent).toEqual(defaultServiceName)
      expect(selectOption.selected).toEqual(true)
    })
  })
})
