import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import createContainer from "#utils/testing/createContainer"
import wait from "#utils/testing/wait"

import { appointment1 } from "../AppointmentsDayView/sampleData"
import CustomerForm from "./index"

describe("CustomerForm", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  const findForm = ({ id }: { id: "customer" }): HTMLFormElement => {
    const form = container.querySelector(`form#${id}`)
    assert(form instanceof HTMLFormElement, "Found element is not a form.")
    return form
  }

  const findField = ({ fieldName }: { fieldName: "firstName" | "lastName" }): HTMLInputElement => {
    const field = findForm({ id: "customer" }).elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, "firstNameField is not an input")
    return field
  }

  const findLabelFor = ({ fieldName }: { fieldName: string }): HTMLLabelElement => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `label for ${fieldName} field not found.`)
    return label
  }

  it("renders a form.", async () => {
    render(<CustomerForm firstName={appointment1.customer.firstName} onSubmit={() => {}} />)
    await wait()

    expect(findForm({ id: "customer" })).not.toBeNull()
  })

  describe("first name field", () => {
    it("renders as a text box.", async () => {
      render(<CustomerForm firstName={appointment1.customer.firstName} onSubmit={() => {}} />)
      await wait()

      expect(findField({ fieldName: "firstName" }).type).toEqual("text")
    })

    it("includes the existing value.", async () => {
      render(<CustomerForm firstName={appointment1.customer.firstName} onSubmit={() => {}} />)
      await wait()

      expect(findField({ fieldName: "firstName" }).value).toEqual(appointment1.customer.firstName)
    })

    it("renders a label.", async () => {
      render(<CustomerForm firstName={appointment1.customer.firstName} onSubmit={() => {}} />)
      await wait()

      expect(findField({ fieldName: "firstName" }).value).toEqual(appointment1.customer.firstName)
      expect(findLabelFor({ fieldName: "firstName" }).textContent).toEqual("First name")
    })

    it("assigns an id that matches the label id.", async () => {
      render(<CustomerForm firstName={appointment1.customer.firstName} onSubmit={() => {}} />)
      await wait()

      expect(findLabelFor({ fieldName: "firstName" }).htmlFor).toEqual(findField({ fieldName: "firstName" }).id)
    })

    it("saves existing when submitted.", async () => {
      // It seems to be useless because async assertions (i. e. in `onSubmit`) completes anyway.
      expect.hasAssertions()

      render(
        <CustomerForm
          firstName={appointment1.customer.firstName}
          onSubmit={({ firstName }) => expect(firstName).toEqual(appointment1.customer.firstName)}
        />
      )
      await wait()

      await ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })

    it("saves new value when submitted.", async () => {
      // It seems to be useless because async assertions (i. e. in `onSubmit`) completes anyway.
      expect.hasAssertions()

      render(<CustomerForm firstName="Ashley" onSubmit={({ firstName }) => expect(firstName).toEqual("Jamie")} />)
      await wait()

      await ReactDomTestUtils.Simulate.change(findField({ fieldName: "firstName" }), {
        // @ts-ignore
        target: { value: "Jamie" },
      })
      await wait()

      await ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
  })
})
