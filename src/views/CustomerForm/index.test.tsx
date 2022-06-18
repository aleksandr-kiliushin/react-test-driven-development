// TODO: replace with node:assert
import assert from "assert"
import { noop } from "lodash"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import { ISpy } from "#declarations/jest"
import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { createContainer } from "#utils/testing/createContainer"
import { createSpy } from "#utils/testing/createSpy"
import { wait } from "#utils/testing/wait"

import { CustomerForm } from "./index"

type IFieldName = keyof ICustomer

describe("CustomerForm", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  const originalFetch = window.fetch
  let fetchSpy: ISpy

  const getCustomerCreationSuccessfullResponse = (body: unknown) => {
    return Promise.resolve({
      ok: true,
      async json() {
        return Promise.resolve(body)
      },
    })
  }

  const getCustomerCreationErrorResponse = () => {
    return Promise.resolve({
      ok: false,
    })
  }

  beforeEach(() => {
    ;({ container, render } = createContainer())
    fetchSpy = createSpy()
    window.fetch = fetchSpy.fn
  })

  afterEach(() => {
    window.fetch = originalFetch
  })

  const findForm = ({ id }: { id: "customer" }): HTMLFormElement => {
    const form = container.querySelector(`form#${id}`)
    assert(form instanceof HTMLFormElement, `Cannot find a form with ID of [${id}].`)
    return form
  }

  const findField = ({ fieldName }: { fieldName: IFieldName }): HTMLInputElement => {
    const field = findForm({ id: "customer" }).elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, `Cannot find a field with fieldName of [${fieldName}].`)
    return field
  }

  const findLabelFor = ({ fieldName }: { fieldName: IFieldName }): HTMLLabelElement => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `Cannot find a label with a [for] attribute of [${fieldName}].`)
    return label
  }

  const itRendersAsATextBox = ({ fieldName }: { fieldName: IFieldName }) => {
    it("renders as a text box.", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
      await wait()
      expect(findField({ fieldName }).type).toEqual("text")
    })
  }

  const itHasThePassedInitialValueAtStart = ({ fieldName }: { fieldName: IFieldName }) => {
    it("includes the existing value", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
      await wait()
      expect(findField({ fieldName }).value).toEqual(aCustomer1[fieldName])
    })
  }

  const itRendersAFieldLabelWithSpecifiedText = ({
    fieldName,
    labelText,
  }: {
    fieldName: IFieldName
    labelText: string
  }) => {
    it("renders a label.", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
      await wait()
      expect(findLabelFor({ fieldName }).textContent).toEqual(labelText)
    })
  }

  const itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId = ({ fieldName }: { fieldName: IFieldName }) => {
    it("assigns an id that matches the label id.", async () => {
      render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
      await wait()
      expect(findLabelFor({ fieldName }).htmlFor).toEqual(findField({ fieldName }).id)
    })
  }

  const itSubmitsWithThePassedInitialValueAtStart = ({ fieldName }: { fieldName: IFieldName }) => {
    it("submits existing value when submitted.", async () => {
      fetchSpy.stubReturnValue(getCustomerCreationSuccessfullResponse(undefined))
      render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
      await wait()
      expect(fetchSpy).CUSTOM_toHaveBeenCalled()
      expect(JSON.parse(fetchSpy.getReceivedArguments()[1].body)[fieldName]).toEqual(aCustomer1[fieldName])
    })
  }

  const itSubmitsWithANewValueWhenANewValueWasEntered = ({
    fieldName,
    newValue,
  }: {
    fieldName: IFieldName
    newValue: string
  }) => {
    it("saves new value when submitted.", async () => {
      fetchSpy.stubReturnValue(getCustomerCreationSuccessfullResponse(undefined))
      render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
      await wait()
      // @ts-ignore
      ReactDomTestUtils.Simulate.change(findField({ fieldName }), { target: { value: newValue } })
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
      await wait()
      expect(fetchSpy).CUSTOM_toHaveBeenCalled()
      const optionsBodyFetchHasBeenCalledWith = JSON.parse(fetchSpy.getReceivedArguments()[1].body)
      expect(optionsBodyFetchHasBeenCalledWith[fieldName]).toEqual(newValue)
    })
  }

  it("renders a form.", async () => {
    render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
    await wait()
    expect(findForm({ id: "customer" })).not.toBeNull()
  })

  describe("first name field", () => {
    const fieldName: IFieldName = "firstName"
    itRendersAsATextBox({ fieldName })
    itHasThePassedInitialValueAtStart({ fieldName })
    itRendersAFieldLabelWithSpecifiedText({ fieldName, labelText: "First name" })
    itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId({ fieldName })
    itSubmitsWithThePassedInitialValueAtStart({ fieldName })
    itSubmitsWithANewValueWhenANewValueWasEntered({ fieldName, newValue: "Sara" })
  })

  describe("last name field", () => {
    const fieldName: IFieldName = "lastName"
    itRendersAsATextBox({ fieldName })
    itHasThePassedInitialValueAtStart({ fieldName })
    itRendersAFieldLabelWithSpecifiedText({ fieldName, labelText: "Last name" })
    itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId({ fieldName })
    itSubmitsWithThePassedInitialValueAtStart({ fieldName })
    itSubmitsWithANewValueWhenANewValueWasEntered({ fieldName, newValue: "Peterson" })
  })

  describe("phone number field", () => {
    const fieldName: IFieldName = "phoneNumber"
    itRendersAsATextBox({ fieldName })
    itHasThePassedInitialValueAtStart({ fieldName })
    itRendersAFieldLabelWithSpecifiedText({ fieldName, labelText: "Phone number" })
    itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId({ fieldName })
    itSubmitsWithThePassedInitialValueAtStart({ fieldName })
    itSubmitsWithANewValueWhenANewValueWasEntered({ fieldName, newValue: "123-456-789" })
  })

  it("has a submit button", async () => {
    render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
    await wait()
    const submitButton = container.querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })

  it("calls fetch with the right properties when submitting data", async () => {
    fetchSpy.stubReturnValue(getCustomerCreationSuccessfullResponse(undefined))
    render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
    await wait()
    ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    await wait()
    expect(fetchSpy).CUSTOM_toHaveBeenCalled()
    expect(fetchSpy.getReceivedArguments()[0]).toEqual("/customers")
    const fetchOptions: RequestInit = fetchSpy.getReceivedArguments()[1]
    expect(fetchOptions.method).toEqual("POST")
    expect(fetchOptions.credentials).toEqual("same-origin")
    expect(fetchOptions.headers).toEqual({ "Content-Type": "application/json" })
  })

  it("notifies onCustomerSuccessfullyCreated when form is submitted", async () => {
    const onCustomerSuccessfullyCreatedSpy = createSpy()
    fetchSpy.stubReturnValue(getCustomerCreationSuccessfullResponse(aCustomer1))
    render(
      <CustomerForm
        initialCustomerData={aCustomer1}
        onCustomerSuccessfullyCreated={onCustomerSuccessfullyCreatedSpy.fn}
      />
    )
    await wait()
    ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    await wait()
    expect(onCustomerSuccessfullyCreatedSpy).CUSTOM_toHaveBeenCalled()
    expect(onCustomerSuccessfullyCreatedSpy.getReceivedArguments()[0]).toEqual(aCustomer1)
  })

  it("does not notify onCustomerSuccessfullyCreated if the POST request returns an error", async () => {
    const onCustomerSuccessfullyCreatedSpy = createSpy()
    fetchSpy.stubReturnValue(getCustomerCreationErrorResponse())
    render(
      <CustomerForm
        initialCustomerData={aCustomer1}
        onCustomerSuccessfullyCreated={onCustomerSuccessfullyCreatedSpy.fn}
      />
    )
    await wait()
    ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    await wait()
    expect(onCustomerSuccessfullyCreatedSpy).not.CUSTOM_toHaveBeenCalled()
  })

  it("prevents the default action when submitting the form", async () => {
    const preventFormDefaultActionSpy = createSpy()
    fetchSpy.stubReturnValue(getCustomerCreationSuccessfullResponse(aCustomer1))
    render(<CustomerForm initialCustomerData={aCustomer1} onCustomerSuccessfullyCreated={noop} />)
    await wait()
    ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }), { preventDefault: preventFormDefaultActionSpy.fn })
    await wait()
    expect(preventFormDefaultActionSpy).CUSTOM_toHaveBeenCalled()
  })
})
