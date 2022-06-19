import { noop } from "lodash"
import assert from "node:assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils, { act } from "react-dom/test-utils"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { createContainer } from "#utils/testing/createContainer"
import { createFetchErrorResponse, createFetchSuccessfulResponse } from "#utils/testing/createFetchResponse"

import { CustomerForm, ICustomerFormProps } from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IFieldName = keyof ICustomer

const defaultProps: ICustomerFormProps = {
  initialCustomerData: aCustomer1,
  onCustomerCreated: noop,
}

describe("CustomerForm", () => {
  let container: HTMLDivElement
  let render: ReactDom.Root["render"]

  const originalFetch = window.fetch
  let fetchSpy: jest.Mock

  beforeEach(() => {
    ;({ container, render } = createContainer())
    fetchSpy = jest.fn()
    window.fetch = fetchSpy
    fetchSpy.mockReturnValue(createFetchSuccessfulResponse(undefined))
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

  const getFetchRequestBody = () => {
    return JSON.parse(fetchSpy.mock.calls[0][1].body)
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
      expect(getFetchRequestBody()).toMatchObject({ [fieldName]: aCustomer1[fieldName] })
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
      expect(getFetchRequestBody()).toMatchObject({ [fieldName]: newValue })
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
    expect(fetchSpy).toHaveBeenCalledWith(
      "/customers",
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
    )
  })

  it("notifies onCustomerCreated when form is submitted", async () => {
    const onCustomerCreatedSpy = jest.fn()
    fetchSpy.mockReturnValue(createFetchSuccessfulResponse(aCustomer1))
    act(() => {
      render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerCreatedSpy} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm())
    })
    expect(onCustomerCreatedSpy).toHaveBeenCalledWith(aCustomer1)
  })

  it("does not notify onCustomerCreated if the POST request returns an error", async () => {
    const onCustomerCreatedSpy = jest.fn()
    fetchSpy.mockReturnValue(createFetchErrorResponse())
    act(() => {
      render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerCreatedSpy} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm())
    })
    expect(onCustomerCreatedSpy).not.toHaveBeenCalled()
  })

  it("prevents the default action when submitting the form", () => {
    const preventFormDefaultActionSpy = jest.fn()
    fetchSpy.mockReturnValue(createFetchSuccessfulResponse(aCustomer1))
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    ReactDomTestUtils.Simulate.submit(findForm(), { preventDefault: preventFormDefaultActionSpy })
    expect(preventFormDefaultActionSpy).toHaveBeenCalled()
  })

  it("renders error message when fetch call fails", async () => {
    fetchSpy.mockReturnValue(createFetchErrorResponse())
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
