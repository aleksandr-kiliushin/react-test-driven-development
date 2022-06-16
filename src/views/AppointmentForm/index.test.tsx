import assert from "assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import { createContainer } from "#utils/testing/createContainer"
import { wait } from "#utils/testing/wait"

import { appointmentFormDefaultProps } from "./appointmentFormDefaultProps"
import { AppointmentForm, IFieldName } from "./index"

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

  const findSelectField = ({ fieldName }: { fieldName: IFieldName }): HTMLSelectElement => {
    const field = findForm({ id: "appointment" }).elements.namedItem(fieldName)
    assert(field instanceof HTMLSelectElement, "firstNameField is not a select")
    return field
  }

  const findSelectOption = ({
    optionTextContent,
    selectFieldName,
  }: {
    optionTextContent: string
    selectFieldName: IFieldName
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

  const findLabelFor = ({ fieldName }: { fieldName: IFieldName }): HTMLLabelElement => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `label for ${fieldName} field not found.`)
    return label
  }

  it("renders a form.", async () => {
    render(<AppointmentForm {...appointmentFormDefaultProps} />)
    await wait()
    expect(findForm({ id: "appointment" })).not.toBeNull()
  })

  describe("service field", () => {
    it("renders as a select box", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findSelectField({ fieldName: "serviceName" })).not.toBeNull()
    })

    it("lists all salon services", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const optionNodes = Array.from(findSelectField({ fieldName: "serviceName" }).childNodes)
      const renderedServices = optionNodes.map((node) => node.textContent)
      expect(renderedServices).toEqual(expect.arrayContaining(appointmentFormDefaultProps.availableServiceNames))
    })

    it("pre-selects the existing value", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const selectOption = findSelectOption({
        optionTextContent: appointmentFormDefaultProps.defaultServiceName,
        selectFieldName: "serviceName",
      })
      expect(selectOption.textContent).toEqual(appointmentFormDefaultProps.defaultServiceName)
      expect(selectOption.selected).toEqual(true)
    })

    it("renders a field label with an appropriate htmlFor attribute", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findLabelFor({ fieldName: "serviceName" })).not.toBeNull()
    })

    it("assign label htmlFor matching to the select field ID", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const field = findSelectField({ fieldName: "serviceName" })
      const label = findLabelFor({ fieldName: "serviceName" })
      expect(label.htmlFor).toEqual(field.id)
    })

    it("saves the default service name when the form is submitted", async () => {
      expect.hasAssertions()
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            expect(formValues.serviceName).toEqual(appointmentFormDefaultProps.defaultServiceName)
          }}
        />
      )
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })

    it("saves the new entered service name when the form is submitted", async () => {
      expect.hasAssertions()

      const aNewEnteredServiceName = "Cut"
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            expect(formValues.serviceName).toEqual(aNewEnteredServiceName)
          }}
        />
      )
      await wait()
      ReactDomTestUtils.Simulate.change(findSelectField({ fieldName: "serviceName" }), {
        // @ts-ignore
        target: { value: aNewEnteredServiceName },
      })
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })
  })

  describe("stylist field", () => {
    it("renders as a select box", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findSelectField({ fieldName: "stylistName" })).not.toBeNull()
    })

    it("pre-selects an empty stylist name", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findSelectField({ fieldName: "stylistName" }).value).toEqual("")
    })

    it("renders a field label with an appropriate htmlFor attribute", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findLabelFor({ fieldName: "stylistName" })).not.toBeNull()
    })

    it("assign label htmlFor matching to the select field ID", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const field = findSelectField({ fieldName: "serviceName" })
      const label = findLabelFor({ fieldName: "serviceName" })
      expect(label.htmlFor).toEqual(field.id)
    })

    it.skip("onSubmit returns null the form is submitted with no stylist selected", async () => {
      expect.hasAssertions()
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            expect(formValues).toEqual(null)
          }}
        />
      )
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })

    // it("lists all salon services", async () => {
    //   render(
    //     <AppointmentForm
    //       availableServiceNames={availableServiceNames}
    //       availableTimeSlots={[]}
    //       defaultServiceName=""
    //       onSubmit={noop}
    //       salonOpensAt={12}
    //       salonClosesAt={14}
    //       today={new Date()}
    //     />
    //   )
    //   await wait()
    //   const optionNodes = Array.from(findSelectField({ fieldName: "serviceName" }).childNodes)
    //   const renderedServices = optionNodes.map((node) => node.textContent)
    //   expect(renderedServices).toEqual(expect.arrayContaining(availableServiceNames))
    // })

    // it("saves the new entered service name when the form is submitted", async () => {
    //   const defaultServiceName = "Blow-dry"
    //   const aNewEnteredServiceName = "Cut"
    //   render(
    //     <AppointmentForm
    //       availableServiceNames={availableServiceNames}
    //       availableTimeSlots={[]}
    //       defaultServiceName={defaultServiceName}
    //       onSubmit={(formValues) => {
    //         expect(formValues.serviceName).toEqual(aNewEnteredServiceName)
    //       }}
    //       salonOpensAt={12}
    //       salonClosesAt={14}
    //       today={new Date()}
    //     />
    //   )
    //   await wait()
    //   ReactDomTestUtils.Simulate.change(findSelectField({ fieldName: "serviceName" }), {
    //     // @ts-ignore
    //     target: { value: aNewEnteredServiceName },
    //   })
    //   await wait()
    //   ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    // })
  })
})
