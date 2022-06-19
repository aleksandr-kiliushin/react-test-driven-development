import { noop } from "lodash"
import assert from "node:assert"
import React from "react"
import ReactDomTestUtils, { act } from "react-dom/test-utils"
import "whatwg-fetch"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { ICreateContainerResult, createContainer } from "#utils/testing/createContainer"
import { createFetchErrorResponse, createFetchSuccessfulResponse, getRequestBodyOf } from "#utils/testing/spyHelpers"

import { CustomerForm, ICustomerFormProps } from "./index"

globalThis.IS_REACT_ACT_ENVIRONMENT = true // TODO: Move to test setup file.

type IFieldName = keyof ICustomer

const defaultProps: ICustomerFormProps = {
  initialCustomerData: aCustomer1,
  onCustomerCreated: noop,
}

describe("CustomerForm", () => {
  let container: ICreateContainerResult["container"]
  let findForm: ICreateContainerResult["findForm"]
  let render: ICreateContainerResult["render"]

  beforeEach(() => {
    ;({ container, findForm, render } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse(undefined))
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

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
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
      expect(getRequestBodyOf(globalThis.fetch as jest.Mock)).toMatchObject({ [fieldName]: aCustomer1[fieldName] })
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
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
      expect(getRequestBodyOf(globalThis.fetch as jest.Mock)).toMatchObject({ [fieldName]: newValue })
    })
  }

  it("renders a form.", () => {
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
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
    ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    expect(globalThis.fetch).toHaveBeenCalledWith(
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
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(aCustomer1))
    act(() => {
      render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerCreatedSpy} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
    expect(onCustomerCreatedSpy).toHaveBeenCalledWith(aCustomer1)
  })

  it("does not notify onCustomerCreated if the POST request returns an error", async () => {
    const onCustomerCreatedSpy = jest.fn()
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchErrorResponse())
    act(() => {
      render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerCreatedSpy} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
    expect(onCustomerCreatedSpy).not.toHaveBeenCalled()
  })

  it("prevents the default action when submitting the form", () => {
    const preventFormDefaultActionSpy = jest.fn()
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(aCustomer1))
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }), { preventDefault: preventFormDefaultActionSpy })
    expect(preventFormDefaultActionSpy).toHaveBeenCalled()
  })

  it("renders error message when fetch call fails", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchErrorResponse())
    act(() => {
      render(<CustomerForm {...defaultProps} />)
    })
    await act(async () => {
      ReactDomTestUtils.Simulate.submit(findForm({ id: "customer" }))
    })
    const errorMessage = container.querySelector("p.error")
    assert(errorMessage !== null, "Could not find errorMessage node.")
    expect(errorMessage.textContent).toMatch("An error occurred during save.")
  })
})
