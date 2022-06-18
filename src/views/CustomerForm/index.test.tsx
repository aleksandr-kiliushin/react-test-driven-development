import { noop } from "lodash"
import assert from "node:assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils, { act } from "react-dom/test-utils"

import { ISpy } from "#declarations/jest"
import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { createContainer } from "#utils/testing/createContainer"
import { createSpy } from "#utils/testing/createSpy"

import { CustomerForm, ICustomerFormProps } from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IFieldName = keyof ICustomer

const defaultProps: ICustomerFormProps = {
  initialCustomerData: aCustomer1,
  onCustomerCreated: noop,
}

const createCustomerCreationSuccessfullResponse = (body: unknown) => {
  return Promise.resolve({
    ok: true,
    async json() {
      return Promise.resolve(body)
    },
  })
}

const createCustomerCreationErrorResponse = () => {
  return Promise.resolve({
    ok: false,
  })
}

describe("CustomerForm", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  const originalFetch = window.fetch
  let fetchSpy: ISpy

  beforeEach(() => {
    ;({ container, render } = createContainer())
    fetchSpy = createSpy()
    window.fetch = fetchSpy.fn
    fetchSpy.stubReturnValue(createCustomerCreationSuccessfullResponse(undefined))
  })

  afterEach(() => {
    window.fetch = originalFetch
  })

  const findForm = (): HTMLFormElement => {
    const form = container.querySelector(`form#customer`)
    assert(form instanceof HTMLFormElement, `Cannot find a form with ID of [customer].`)
    return form
  }

  const findField = ({ fieldName }: { fieldName: IFieldName }): HTMLInputElement => {
    const field = findForm().elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, `Cannot find a field with fieldName of [${fieldName}].`)
    return field
  }

  const findLabelFor = ({ fieldName }: { fieldName: IFieldName }): HTMLLabelElement => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `Cannot find a label with a [for] attribute of [${fieldName}].`)
    return label
  }

  const itRendersAsATextBox = ({ fieldName }: { fieldName: IFieldName }) => {
    it("renders as a text box.", () => {
      act(() => {
        render(<CustomerForm {...defaultProps} />)
      })
      expect(findField({ fieldName }).type).toEqual("text")
    })
  }

  const itHasThePassedInitialValueAtStart = ({ fieldName }: { fieldName: IFieldName }) => {
    it("includes the existing value", () => {
      act(() => {
        render(<CustomerForm {...defaultProps} />)
      })
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
    it("renders a label.", () => {
      act(() => {
        render(<CustomerForm {...defaultProps} />)
      })
      expect(findLabelFor({ fieldName }).textContent).toEqual(labelText)
    })
  }

  const itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId = ({ fieldName }: { fieldName: IFieldName }) => {
    it("assigns an id that matches the label id.", () => {
      act(() => {
        render(<CustomerForm {...defaultProps} />)
      })
      expect(findLabelFor({ fieldName }).htmlFor).toEqual(findField({ fieldName }).id)
    })
  }

  const itSubmitsWithThePassedInitialValueAtStart = ({ fieldName }: { fieldName: IFieldName }) => {
    it("submits existing value when submitted.", () => {
      act(() => {
        render(<CustomerForm {...defaultProps} />)
      })
      ReactDomTestUtils.Simulate.submit(findForm())
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
    it("saves new value when submitted.", () => {
      act(() => {
        render(<CustomerForm {...defaultProps} />)
      })
      act(() => {
        // @ts-ignore
        ReactDomTestUtils.Simulate.change(findField({ fieldName }), { target: { value: newValue } })
      })
      ReactDomTestUtils.Simulate.submit(findForm())
      expect(fetchSpy).CUSTOM_toHaveBeenCalled()
      const optionsBodyFetchHasBeenCalledWith = JSON.parse(fetchSpy.getReceivedArguments()[1].body)
      expect(optionsBodyFetchHasBeenCalledWith[fieldName]).toEqual(newValue)
    })
  }

  it("renders a form.", () => {
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    expect(findForm()).not.toBeNull()
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

  it("has a submit button", () => {
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    const submitButton = container.querySelector('input[type="submit"]')
    expect(submitButton).not.toBeNull()
  })

  it("calls fetch with the right properties when submitting data", () => {
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    ReactDomTestUtils.Simulate.submit(findForm())
    expect(fetchSpy).CUSTOM_toHaveBeenCalled()
    expect(fetchSpy.getReceivedArguments()[0]).toEqual("/customers")
    const fetchOptions: RequestInit = fetchSpy.getReceivedArguments()[1]
    expect(fetchOptions.method).toEqual("POST")
    expect(fetchOptions.credentials).toEqual("same-origin")
    expect(fetchOptions.headers).toEqual({ "Content-Type": "application/json" })
  })

  it("notifies onCustomerCreated when form is submitted", async () => {
    const onCustomerSuccessfullyCreatedSpy = createSpy()
    fetchSpy.stubReturnValue(createCustomerCreationSuccessfullResponse(aCustomer1))
    act(() => {
      render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerSuccessfullyCreatedSpy.fn} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm())
    })
    expect(onCustomerSuccessfullyCreatedSpy).CUSTOM_toHaveBeenCalled()
    expect(onCustomerSuccessfullyCreatedSpy.getReceivedArguments()[0]).toEqual(aCustomer1)
  })

  it("does not notify onCustomerCreated if the POST request returns an error", async () => {
    const onCustomerSuccessfullyCreatedSpy = createSpy()
    fetchSpy.stubReturnValue(createCustomerCreationErrorResponse())
    act(() => {
      render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerSuccessfullyCreatedSpy.fn} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm())
    })
    expect(onCustomerSuccessfullyCreatedSpy).not.CUSTOM_toHaveBeenCalled()
  })

  it("prevents the default action when submitting the form", () => {
    const preventFormDefaultActionSpy = createSpy()
    fetchSpy.stubReturnValue(createCustomerCreationSuccessfullResponse(aCustomer1))
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    ReactDomTestUtils.Simulate.submit(findForm(), { preventDefault: preventFormDefaultActionSpy.fn })
    expect(preventFormDefaultActionSpy).CUSTOM_toHaveBeenCalled()
  })

  it("renders error message when fetch call fails", async () => {
    fetchSpy.stubReturnValue(createCustomerCreationErrorResponse())
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm())
    })
    const errorMessage = container.querySelector("p.error")
    assert(errorMessage !== null, "Could not find errorMessage node.")
    expect(errorMessage.textContent).toMatch("An error occurred during save.")
  })
})
