import assert from "assert"
import noop from "lodash/noop"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { createContainer } from "#utils/testing/createContainer"
import { wait } from "#utils/testing/wait"

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
    assert(form instanceof HTMLFormElement, `Cannot find a form with ID of [${id}].`)
    return form
  }

  const findField = ({ fieldName }: { fieldName: FieldName }): HTMLInputElement => {
    const field = findForm({ id: "customer" }).elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, `Cannot find a field with fieldName of [${fieldName}].`)
    return field
  }

  const findLabelFor = ({ fieldName }: { fieldName: FieldName }): HTMLLabelElement => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `Cannot find a label with a [for] attribute of [${fieldName}].`)
    return label
  }

  const itRendersAsATextBox = ({ fieldName }: { fieldName: FieldName }) => {
    it("renders as a text box.", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onSubmit={noop} />)
      await wait()
      expect(findField({ fieldName }).type).toEqual("text")
    })
  }

  const itHasThePassedInitialValueAtStart = ({ fieldName }: { fieldName: FieldName }) => {
    it("includes the existing value", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onSubmit={noop} />)
      await wait()
      expect(findField({ fieldName }).value).toEqual(aCustomer1[fieldName])
    })
  }

  const itRendersAFieldLabelWithSpecifiedText = ({
    fieldName,
    labelText,
  }: {
    fieldName: FieldName
    labelText: string
  }) => {
    it("renders a label.", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onSubmit={noop} />)
      await wait()
      expect(findLabelFor({ fieldName }).textContent).toEqual(labelText)
    })
  }

  const itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId = ({ fieldName }: { fieldName: FieldName }) => {
    it("assigns an id that matches the label id.", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onSubmit={noop} />)
      await wait()
      expect(findLabelFor({ fieldName }).htmlFor).toEqual(findField({ fieldName }).id)
    })
  }

  const itSubmitsWithThePassedInitialValueAtStart = ({ fieldName }: { fieldName: FieldName }) => {
    it("submits existing value.", async () => {
      expect.hasAssertions() // It seems to be useless because async assertions (i. e. in `onSubmit`) complete anyway.

      render(
        <CustomerForm
          initialCustomerData={aCustomer1}
          onSubmit={(formValues) => expect(formValues[fieldName]).toEqual(aCustomer1[fieldName])}
        />
      )
      await wait()

      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
      await wait()
    })
  }

  const itSubmitsWithANewValueWhenANewValueWasEntered = ({
    fieldName,
    newValue,
  }: {
    fieldName: FieldName
    newValue: string
  }) => {
    it("saves new value when submitted.", async () => {
      expect.hasAssertions() // It seems to be useless because async assertions (i. e. in `onSubmit`) complete anyway.

      render(
        <CustomerForm
          initialCustomerData={aCustomer1}
          onSubmit={(formValues) => expect(formValues[fieldName]).toEqual(newValue)}
        />
      )
      await wait()

      // @ts-ignore
      ReactDomTestUtils.Simulate.change(findField({ fieldName }), { target: { value: newValue } })
      await wait()

      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
  }

  it("renders a form.", async () => {
    render(<CustomerForm initialCustomerData={aCustomer1} onSubmit={noop} />)
    await wait()
    expect(findForm({ id: "customer" })).not.toBeNull()
  })

  describe("first name field", () => {
    const fieldName: FieldName = "firstName"
    itRendersAsATextBox({ fieldName })
    itHasThePassedInitialValueAtStart({ fieldName })
    itRendersAFieldLabelWithSpecifiedText({ fieldName, labelText: "First name" })
    itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId({ fieldName })
    itSubmitsWithThePassedInitialValueAtStart({ fieldName })
    itSubmitsWithANewValueWhenANewValueWasEntered({ fieldName, newValue: "Sara" })
  })

  describe("last name field", () => {
    const fieldName: FieldName = "lastName"
    itRendersAsATextBox({ fieldName })
    itHasThePassedInitialValueAtStart({ fieldName })
    itRendersAFieldLabelWithSpecifiedText({ fieldName, labelText: "Last name" })
    itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId({ fieldName })
    itSubmitsWithThePassedInitialValueAtStart({ fieldName })
    itSubmitsWithANewValueWhenANewValueWasEntered({ fieldName, newValue: "Peterson" })
  })

  describe("phone number field", () => {
    const fieldName: FieldName = "phoneNumber"
    itRendersAsATextBox({ fieldName })
    itHasThePassedInitialValueAtStart({ fieldName })
    itRendersAFieldLabelWithSpecifiedText({ fieldName, labelText: "Phone number" })
    itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId({ fieldName })
    itSubmitsWithThePassedInitialValueAtStart({ fieldName })
    itSubmitsWithANewValueWhenANewValueWasEntered({ fieldName, newValue: "123-456-789" })
  })

  it("has a submit button", async () => {
    render(<CustomerForm initialCustomerData={aCustomer1} onSubmit={noop} />)
    await wait()
    const submitButton = container.querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })
})
