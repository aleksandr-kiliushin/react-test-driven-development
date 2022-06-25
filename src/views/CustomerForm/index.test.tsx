import { noop } from "lodash"
import assert from "node:assert"
import React from "react"

import { aCustomer1 } from "#sampleData/someCustomers"
import { ICustomer } from "#types/ICustomer"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchErrorResponse, createFetchSuccessfulResponse, getRequestBodyOf } from "#utils/testing/spyHelpers"

import { CustomerForm, ICustomerFormProps } from "./index"

type IFieldName = keyof Omit<ICustomer, "id">

const defaultProps: ICustomerFormProps = {
  initialCustomerData: aCustomer1,
  onCustomerCreated: noop,
}

type ICustomerFormRenderContainer = IRenderContainer<{ formIds: ["customer"]; fieldNames: IFieldName[] }>

describe("CustomerForm", () => {
  let findElement: ICustomerFormRenderContainer["findElement"]
  let findField: ICustomerFormRenderContainer["findField"]
  let findFieldLabel: ICustomerFormRenderContainer["findFieldLabel"]
  let findForm: ICustomerFormRenderContainer["findForm"]
  let render: ICustomerFormRenderContainer["render"]
  let simulateBlur: ICustomerFormRenderContainer["simulateBlur"]
  let simulateChange: ICustomerFormRenderContainer["simulateChange"]
  let simulateSubmit: ICustomerFormRenderContainer["simulateSubmit"]
  let simulateSubmitAndWait: ICustomerFormRenderContainer["simulateSubmitAndWait"]

  beforeEach(() => {
    ;({
      findElement,
      findField,
      findFieldLabel,
      findForm,
      render,
      simulateBlur,
      simulateChange,
      simulateSubmit,
      simulateSubmitAndWait,
    } = createContainer())
    // @ts-ignore
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse())
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

  const itRendersAsATextBox = ({ fieldName }: { fieldName: IFieldName }) => {
    it("renders as a text box.", () => {
      render(<CustomerForm {...defaultProps} />)
      expect(findField({ fieldName, formId: "customer" }).type).toEqual("text")
    })
  }

  const itHasThePassedInitialValueAtStart = ({ fieldName }: { fieldName: IFieldName }) => {
    it("includes the existing value", () => {
      render(<CustomerForm {...defaultProps} />)
      expect(findField({ fieldName, formId: "customer" }).value).toEqual(aCustomer1[fieldName])
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
      render(<CustomerForm {...defaultProps} />)
      expect(findFieldLabel({ fieldName, formId: "customer" }).textContent).toEqual(labelText)
    })
  }

  const itAssignsAFieldAnIdThatMatchesTheCorrespondingLabelId = ({ fieldName }: { fieldName: IFieldName }) => {
    it("assigns an id that matches the label id.", () => {
      render(<CustomerForm {...defaultProps} />)
      expect(findFieldLabel({ fieldName, formId: "customer" }).htmlFor).toEqual(
        findField({ fieldName, formId: "customer" }).id
      )
    })
  }

  const itSubmitsWithThePassedInitialValueAtStart = ({ fieldName }: { fieldName: IFieldName }) => {
    it("submits existing value when submitted.", async () => {
      render(<CustomerForm {...defaultProps} />)
      await simulateSubmitAndWait(findForm({ id: "customer" }))
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
    it("saves new value when submitted.", async () => {
      render(<CustomerForm {...defaultProps} />)
      // @ts-ignore
      simulateChange(findField({ fieldName, formId: "customer" }), { target: { value: newValue } })
      await simulateSubmitAndWait(findForm({ id: "customer" }))
      expect(getRequestBodyOf(globalThis.fetch as jest.Mock)).toMatchObject({ [fieldName]: newValue })
    })
  }

  it("renders a form.", () => {
    render(<CustomerForm {...defaultProps} />)
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
    render(<CustomerForm {...defaultProps} />)
    expect(findElement('input[type="submit"]')).not.toBeNull()
  })

  it("calls fetch with the right properties when submitting data", async () => {
    render(<CustomerForm {...defaultProps} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/customers",
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
    render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerCreatedSpy} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    expect(onCustomerCreatedSpy).toHaveBeenCalledWith(aCustomer1)
  })

  it("does not notify onCustomerCreated if the POST request returns an error", async () => {
    const onCustomerCreatedSpy = jest.fn()
    ;(globalThis.fetch as jest.Mock).mockReturnValueOnce(createFetchErrorResponse({ body: undefined, status: 500 }))
    render(<CustomerForm {...defaultProps} onCustomerCreated={onCustomerCreatedSpy} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    expect(onCustomerCreatedSpy).not.toHaveBeenCalled()
  })

  it("prevents the default action when submitting the form", async () => {
    const preventFormDefaultActionSpy = jest.fn()
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchSuccessfulResponse(aCustomer1))
    render(<CustomerForm {...defaultProps} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }), { preventDefault: preventFormDefaultActionSpy })
    expect(preventFormDefaultActionSpy).toHaveBeenCalled()
  })

  it("renders error message when fetch call fails", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValueOnce(createFetchErrorResponse({ body: undefined, status: 500 }))
    render(<CustomerForm {...defaultProps} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    const errorMessageNode = findElement("input[type='submit'] ~ p.error")
    assert(errorMessageNode !== null, "Error node is not appear after failed form submission.")
    expect(errorMessageNode.textContent).toMatch("An error occurred during save.")
  })

  it("unmounts error message after successful submitting.", async () => {
    ;(globalThis.fetch as jest.Mock).mockReturnValueOnce(createFetchErrorResponse({ body: undefined, status: 500 }))
    ;(globalThis.fetch as jest.Mock).mockReturnValueOnce(createFetchSuccessfulResponse(aCustomer1))
    render(<CustomerForm {...defaultProps} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    expect(findElement("input[type='submit'] ~ p.error")).not.toBeNull()
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    expect(findElement("input[type='submit'] ~ p.error")).toBeNull()
  })

  describe("validation", () => {
    it("displays error after blur when first name field is blank", () => {
      render(<CustomerForm {...defaultProps} />)
      const firstNameField = findField({ fieldName: "firstName", formId: "customer" })
      // @ts-ignore
      simulateChange(firstNameField, { target: { value: "    " } })
      simulateBlur(firstNameField)
      const errorMessageNode = findElement("input[name='firstName'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for firstName is not found.")
      expect(errorMessageNode.textContent).toMatch("Required.")
    })

    it("displays error after blur when last name field is blank", () => {
      render(<CustomerForm {...defaultProps} />)
      const lastNameField = findField({ fieldName: "lastName", formId: "customer" })
      // @ts-ignore
      simulateChange(lastNameField, { target: { value: "    " } })
      simulateBlur(lastNameField)
      const errorMessageNode = findElement("input[name='lastName'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for firstName is not found.")
      expect(errorMessageNode.textContent).toMatch("Required.")
    })

    it("displays error after blur when phone number field is blank", () => {
      render(<CustomerForm {...defaultProps} />)
      const phoneNumberField = findField({ fieldName: "phoneNumber", formId: "customer" })
      // @ts-ignore
      simulateChange(phoneNumberField, { target: { value: "    " } })
      simulateBlur(phoneNumberField)
      const errorMessageNode = findElement("input[name='phoneNumber'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for phoneNumber is not found.")
      expect(errorMessageNode.textContent).toMatch("Required.")
    })

    it("displays error after blur when phone number field is filled with not acceptable characters", () => {
      render(<CustomerForm {...defaultProps} />)
      const phoneNumberField = findField({ fieldName: "phoneNumber", formId: "customer" })
      // @ts-ignore
      simulateChange(phoneNumberField, { target: { value: "+7 123 456 789 hehe" } })
      simulateBlur(phoneNumberField)
      const errorMessageNode = findElement("input[name='phoneNumber'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for phoneNumber is not found.")
      expect(errorMessageNode.textContent).toMatch("Only numbers, spaces and these symbols are allowed: ( ) + -.")
    })

    it("hides error after successful onChange fixes firstName field error", () => {
      render(<CustomerForm {...defaultProps} />)
      const firstNameField = findField({ fieldName: "firstName", formId: "customer" })
      // @ts-ignore
      simulateChange(firstNameField, { target: { value: "   " } })
      simulateBlur(firstNameField)
      const errorMessageNode = findElement("input[name='firstName'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for firstName is not found.")
      expect(errorMessageNode.textContent).toMatch("Required.")
      // @ts-ignore
      simulateChange(firstNameField, { target: { value: "Shon" } })
      expect(findElement("input[name='firstName'] ~ p.error")).toBeNull()
    })

    it("hides error after successful onChange fixes lastName field error", () => {
      render(<CustomerForm {...defaultProps} />)
      const lastNameField = findField({ fieldName: "lastName", formId: "customer" })
      // @ts-ignore
      simulateChange(lastNameField, { target: { value: "" } })
      simulateBlur(lastNameField)
      const errorMessageNode = findElement("input[name='lastName'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for lastName is not found.")
      expect(errorMessageNode.textContent).toMatch("Required.")
      // @ts-ignore
      simulateChange(lastNameField, { target: { value: "Johnson" } })
      expect(findElement("input[name='lastName'] ~ p.error")).toBeNull()
    })

    it("hides error after successful onChange fixes phoneNumber field error", () => {
      render(<CustomerForm {...defaultProps} />)
      const phoneNumberField = findField({ fieldName: "phoneNumber", formId: "customer" })
      // @ts-ignore
      simulateChange(phoneNumberField, { target: { value: "+7 123 456 789 hehe" } })
      simulateBlur(phoneNumberField)
      const errorMessageNode = findElement("input[name='phoneNumber'] ~ p.error")
      assert(errorMessageNode !== null, "Field error message for phoneNumber is not found.")
      expect(errorMessageNode.textContent).toMatch("Only numbers, spaces and these symbols are allowed: ( ) + -.")
      // @ts-ignore
      simulateChange(phoneNumberField, { target: { value: "+7 123 456 789" } })
      expect(findElement("input[name='phoneNumber'] ~ p.error")).toBeNull()
    })
  })

  it("does not submit the form and sets error messages when there are validation errors", () => {
    render(
      <CustomerForm
        {...defaultProps}
        initialCustomerData={{ firstName: "", lastName: "Johnson", phoneNumber: "123wef" }}
      />
    )
    simulateSubmit(findForm({ id: "customer" }))
    expect(globalThis.fetch).not.toHaveBeenCalled()

    const firstNameFieldErrorMessageNode = findElement("input[name='firstName'] ~ p.error")
    assert(firstNameFieldErrorMessageNode !== null, "firstName field error not found")
    expect(firstNameFieldErrorMessageNode.textContent).toMatch("Required.")

    const lastNameFieldErrorMessageNode = findElement("input[name='lastName'] ~ p.error")
    expect(lastNameFieldErrorMessageNode).toBeNull()

    const phoneNumberFieldErrorMessageNode = findElement("input[name='phoneNumber'] ~ p.error")
    assert(phoneNumberFieldErrorMessageNode !== null, "phoneNumber field error not found")
    expect(phoneNumberFieldErrorMessageNode.textContent).toMatch(
      "Only numbers, spaces and these symbols are allowed: ( ) + -."
    )
  })

  it("renders field validation errors from server", async () => {
    const serverErrors = { phoneNumber: "Phone number already exists in the system." }
    ;(globalThis.fetch as jest.Mock).mockReturnValue(createFetchErrorResponse({ body: serverErrors, status: 422 }))
    render(<CustomerForm {...defaultProps} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    const phoneNumberFieldErrorMessageNode = findElement("input[name='phoneNumber'] ~ p.error")
    assert(phoneNumberFieldErrorMessageNode !== null, "Phone number error is not found.")
    expect(phoneNumberFieldErrorMessageNode.textContent).toMatch(serverErrors.phoneNumber)
    expect(findElement("input[type='submit'] ~ p.error")).toBeNull()
  })

  // This tets passes, but causes `act` errors, so commented out.
  // it("renders loader during submitting", () => {
  //   render(<CustomerForm {...defaultProps} />)
  //   simulateSubmit(findForm({ id: "customer" }))
  //   expect(findElement("input[type='submit'] ~ p.loader")).not.toBeNull()
  // })

  it("hides loader after submitting", async () => {
    render(<CustomerForm {...defaultProps} />)
    await simulateSubmitAndWait(findForm({ id: "customer" }))
    expect(findElement("input[type='submit'] ~ p.loader")).toBeNull()
  })
})
