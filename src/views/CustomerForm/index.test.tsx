import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import { ICustomer } from "#types/ICustomer"
import { createContainer } from "#utils/testing/createContainer"
import { wait } from "#utils/testing/wait"

import { appointment1 } from "../AppointmentsDayView/sampleData"
import { CustomerForm } from "./index"

type FieldName = keyof ICustomer

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

  const findField = ({ fieldName }: { fieldName: FieldName }): HTMLInputElement => {
    const field = findForm({ id: "customer" }).elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, "firstNameField is not an input")
    return field
  }

  const findLabelFor = ({ fieldName }: { fieldName: FieldName }): HTMLLabelElement => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `label for ${fieldName} field not found.`)
    return label
  }

  const itRendersAsATextBox = ({ fieldName }: { fieldName: FieldName }) => {
    it("renders as a text box.", async () => {
      render(<CustomerForm initialCustomerData={appointment1.customer} onSubmit={() => {}} />)
      await wait()
      expect(findField({ fieldName }).type).toEqual("text")
    })
  }

  const itIncludesTheExistingValue = ({ fieldName }: { fieldName: FieldName }) => {
    it("includes the existing value", async () => {
      render(<CustomerForm initialCustomerData={appointment1.customer} onSubmit={() => {}} />)
      await wait()
      expect(findField({ fieldName }).value).toEqual(appointment1.customer[fieldName])
    })
  }

  const itRendersALabel = ({ fieldName, labelText }: { fieldName: FieldName; labelText: string }) => {
    it("renders a label.", async () => {
      render(<CustomerForm initialCustomerData={appointment1.customer} onSubmit={() => {}} />)
      await wait()
      expect(findLabelFor({ fieldName }).textContent).toEqual(labelText)
    })
  }

  const itAssignsAnIdThatMatchesTheLabelId = ({ fieldName }: { fieldName: FieldName }) => {
    it("assigns an id that matches the label id.", async () => {
      render(<CustomerForm initialCustomerData={appointment1.customer} onSubmit={() => {}} />)
      await wait()
      expect(findLabelFor({ fieldName }).htmlFor).toEqual(findField({ fieldName }).id)
    })
  }

  const itSubmitsExistingValue = ({ fieldName }: { fieldName: FieldName }) => {
    it("submits existing value.", async () => {
      expect.hasAssertions() // It seems to be useless because async assertions (i. e. in `onSubmit`) completes anyway.

      render(
        <CustomerForm
          initialCustomerData={appointment1.customer}
          onSubmit={(formValues) => expect(formValues[fieldName]).toEqual(appointment1.customer[fieldName])}
        />
      )
      await wait()

      await ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
  }

  const itSubmitsANewValue = ({ fieldName, newValue }: { fieldName: FieldName; newValue: string }) => {
    it("saves new value when submitted.", async () => {
      expect.hasAssertions() // It seems to be useless because async assertions (i. e. in `onSubmit`) completes anyway.

      render(
        <CustomerForm
          initialCustomerData={appointment1.customer}
          onSubmit={(formValues) => expect(formValues[fieldName]).toEqual(newValue)}
        />
      )
      await wait()

      await ReactDomTestUtils.Simulate.change(findField({ fieldName }), {
        // @ts-ignore
        target: { value: newValue },
      })
      await wait()

      await ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
  }

  it("renders a form.", async () => {
    render(<CustomerForm initialCustomerData={appointment1.customer} onSubmit={() => {}} />)
    await wait()
    expect(findForm({ id: "customer" })).not.toBeNull()
  })

  describe("first name field", () => {
    const fieldName: FieldName = "firstName"
    itRendersAsATextBox({ fieldName })
    itIncludesTheExistingValue({ fieldName })
    itRendersALabel({ fieldName, labelText: "First name" })
    itAssignsAnIdThatMatchesTheLabelId({ fieldName })
    itSubmitsExistingValue({ fieldName })
    itSubmitsANewValue({ fieldName, newValue: "Sara" })
  })

  describe("last name field", () => {
    const fieldName: FieldName = "lastName"
    itRendersAsATextBox({ fieldName })
    itIncludesTheExistingValue({ fieldName })
    itRendersALabel({ fieldName, labelText: "Last name" })
    itAssignsAnIdThatMatchesTheLabelId({ fieldName })
    itSubmitsExistingValue({ fieldName })
    itSubmitsANewValue({ fieldName, newValue: "Peterson" })
  })

  describe("phone number field", () => {
    const fieldName: FieldName = "phoneNumber"
    itRendersAsATextBox({ fieldName })
    itIncludesTheExistingValue({ fieldName })
    itRendersALabel({ fieldName, labelText: "Phone number" })
    itAssignsAnIdThatMatchesTheLabelId({ fieldName })
    itSubmitsExistingValue({ fieldName })
    itSubmitsANewValue({ fieldName, newValue: "123-456-789" })
  })

  it("has a submit button", async () => {
    render(<CustomerForm initialCustomerData={appointment1.customer} onSubmit={() => {}} />)
    await wait()
    const submitButton = container.querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })
})
