import assert from "assert"
import { noop } from "lodash"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils from "react-dom/test-utils"

import {
  aTimeSlotAtHannaIn6DaysAt_13_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtSuzanTodayAt_12_00,
} from "#sampleData/someTimeSlots"
import { createContainer } from "#utils/testing/createContainer"
import { wait } from "#utils/testing/wait"

import { AppointmentForm, IAppointmentFormProps, IFieldName } from "./index"

const appointmentFormDefaultProps: IAppointmentFormProps = {
  availableServiceNames: ["Cut", "Blow-dry"],
  availableStylists: [
    { name: "Hanna", sertifiedServicesNames: ["Cut"] },
    { name: "Suzan", sertifiedServicesNames: ["Cut", "Blow-dry"] },
  ],
  availableTimeSlots: [
    aTimeSlotAtSuzanTodayAt_12_00,
    aTimeSlotAtHannaTodayAt_13_30,
    aTimeSlotAtSuzanInTwoDaysAt_12_00,
    aTimeSlotAtHannaIn6DaysAt_13_00,
  ],
  defaultServiceName: "Blow-dry",
  onSubmit: noop,
  salonClosesAt: 14,
  salonOpensAt: 12,
  today: new Date(),
}

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

  const findTimeSlotTable = (): HTMLTableElement => {
    const table = container.querySelector("table#time-slots")
    assert(table !== null, "Time slots table not found.")
    assert(table instanceof HTMLTableElement, "Found element is not an instance of HTMLTableElement.")
    return table
  }

  const findTimeSlotRadioButton = ({ inputValue }: { inputValue: string }): HTMLInputElement => {
    const theInput = container.querySelector(`input[type="radio"][name="startsAt"][value="${inputValue}"]`)
    assert(theInput instanceof HTMLInputElement, `Could not find a timeSlot radio input with value of ${inputValue}.`)
    return theInput
  }

  const selectStylist = async ({ aStylistName }: { aStylistName: "Hanna" | "Suzan" }): Promise<void> => {
    ReactDomTestUtils.Simulate.change(findSelectField({ fieldName: "stylistName" }), {
      // @ts-ignore
      target: { value: aStylistName },
    })
    await wait()
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

    it("initialized with the 'Not selected' option", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findSelectField({ fieldName: "stylistName" }).value).toEqual("Not selected")
    })

    it("onSubmit contains 'Not selected' stylist when the form is submitted with no stylist selected", async () => {
      expect.hasAssertions()
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            expect(formValues.stylistName).toEqual("Not selected")
          }}
        />
      )
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })

    it("from start, has only 'Suzan' stylistName available, because only she is certified for 'Blow-dry'", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const optionNodes = Array.from(findSelectField({ fieldName: "stylistName" }).childNodes)
      const availableStylistsNames = optionNodes.map((node) => node.textContent)
      expect(availableStylistsNames).toEqual(["Not selected", "Suzan"])
    })

    it("allows selecting 'Hanna' and 'Suzan' serviceNames when 'Cut' service is choosen, because they both are certified for 'Cut'", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      // @ts-ignore
      ReactDomTestUtils.Simulate.change(findSelectField({ fieldName: "serviceName" }), { target: { value: "Cut" } })
      await wait()
      const optionNodes = Array.from(findSelectField({ fieldName: "stylistName" }).childNodes)
      const availableStylistsNames = optionNodes.map((node) => node.textContent)
      expect(availableStylistsNames).toEqual(["Not selected", "Hanna", "Suzan"])
    })

    it("submits with a newly selected stylistName", async () => {
      expect.hasAssertions()
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            expect(formValues.stylistName).toEqual("Hanna")
          }}
        />
      )
      await wait()
      // @ts-ignore
      ReactDomTestUtils.Simulate.change(findSelectField({ fieldName: "serviceName" }), { target: { value: "Cut" } })
      await wait()
      await selectStylist({ aStylistName: "Hanna" })
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })
  })

  describe("timeslots table", () => {
    it("renders", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      expect(findTimeSlotTable()).not.toBeNull()
    })

    it("renders a time slot for every half an hour between open and close times", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const timesOfDay = findTimeSlotTable().querySelectorAll("tbody >* th")
      expect(timesOfDay).toHaveLength(4)
      expect(timesOfDay[0].textContent).toEqual("12:00")
      expect(timesOfDay[1].textContent).toEqual("12:30")
      expect(timesOfDay[3].textContent).toEqual("13:30")
    })

    it("renders a table cell in quantity of = N timeslots per a day * 7 days", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const slotsPerADayAmount = (14 - 12) / 0.5
      const daysAmount = 7
      const cellsAmount = slotsPerADayAmount * daysAmount
      const cells = container.querySelectorAll("td")
      expect(cells).toHaveLength(cellsAmount)
    })

    it("renders an empty cell at the start of the header row", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const headerRow = findTimeSlotTable().querySelector("thead > tr")
      assert(headerRow instanceof HTMLTableRowElement)
      assert(headerRow.firstChild instanceof HTMLTableCellElement)
      expect(headerRow.firstChild.tagName).toEqual("TH")
      expect(headerRow.firstChild.textContent).toEqual("")
    })

    it("renders a week of available dates", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} today={new Date(2018, 11, 1)} />)
      await wait()
      const dates = findTimeSlotTable().querySelectorAll("thead >* th:not(:first-child)")
      expect(dates).toHaveLength(7)
      expect(dates[0].textContent).toEqual("Sat 01")
      expect(dates[1].textContent).toEqual("Sun 02")
      expect(dates[6].textContent).toEqual("Fri 07")
    })

    it("does not render radio buttons stylistName is not selected", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      const timesOfDay = findTimeSlotTable().querySelectorAll("input")
      expect(timesOfDay).toHaveLength(0)
    })

    it("does not render radio buttons when availableDates is empty", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} availableTimeSlots={[]} />)
      await wait()
      const timesOfDay = findTimeSlotTable().querySelectorAll("input")
      expect(timesOfDay).toHaveLength(0)
    })

    it("for each provided availableDate renders a radio button with the corresponding `value` attribute", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()
      await selectStylist({ aStylistName: "Hanna" })
      const radioButtons = container.querySelectorAll('input[type="radio"]')
      expect(radioButtons).toHaveLength(2)
    })

    it("submits with a undefined value if no value was selected", async () => {
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            expect(formValues.startsAtDate).toBeUndefined()
          }}
        />
      )
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })

    it("submits with a newly selected value if a new value was selected.", async () => {
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          defaultServiceName=""
          onSubmit={(formValues) => {
            assert(formValues.startsAtDate !== undefined)
            expect(formValues.startsAtDate.toString()).toEqual(aTimeSlotAtHannaTodayAt_13_30.startsAt.toString())
          }}
        />
      )
      await wait()
      await selectStylist({ aStylistName: "Hanna" })
      ReactDomTestUtils.Simulate.change(
        findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaTodayAt_13_30.startsAt.toString() })
      )
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })

    it("submits with a another newly selected value if a new value was selected.", async () => {
      render(
        <AppointmentForm
          {...appointmentFormDefaultProps}
          onSubmit={(formValues) => {
            assert(formValues.startsAtDate !== undefined)
            expect(formValues.startsAtDate.toString()).toEqual(aTimeSlotAtSuzanTodayAt_12_00.startsAt.toString())
          }}
        />
      )
      await wait()
      await selectStylist({ aStylistName: "Hanna" })
      ReactDomTestUtils.Simulate.change(
        findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaTodayAt_13_30.startsAt.toString() })
      )
      await wait()
      ReactDomTestUtils.Simulate.change(
        findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.toString() })
      )
      await selectStylist({ aStylistName: "Suzan" })
      await wait()
      ReactDomTestUtils.Simulate.change(
        findTimeSlotRadioButton({ inputValue: aTimeSlotAtSuzanTodayAt_12_00.startsAt.toString() })
      )
      await wait()
      ReactDomTestUtils.Simulate.submit(findForm({ id: "appointment" }))
    })

    it("renders input radio buttons as checked after click on them.", async () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      await wait()

      await selectStylist({ aStylistName: "Suzan" })
      const radioButton1 = findTimeSlotRadioButton({ inputValue: aTimeSlotAtSuzanTodayAt_12_00.startsAt.toString() })
      const radioButton2 = findTimeSlotRadioButton({
        inputValue: aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.toString(),
      })
      expect(radioButton1.checked).toEqual(false)
      expect(radioButton2.checked).toEqual(false)
      ReactDomTestUtils.Simulate.change(radioButton1)
      await wait()
      expect(radioButton1.checked).toEqual(true)
      expect(radioButton2.checked).toEqual(false)
      ReactDomTestUtils.Simulate.change(radioButton2)
      await wait()
      expect(radioButton1.checked).toEqual(false)
      expect(radioButton2.checked).toEqual(true)

      await selectStylist({ aStylistName: "Hanna" })
      const radioButton3 = findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaTodayAt_13_30.startsAt.toString() })
      const radioButton4 = findTimeSlotRadioButton({
        inputValue: aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.toString(),
      })
      expect(radioButton3.checked).toEqual(false)
      expect(radioButton4.checked).toEqual(false)
      ReactDomTestUtils.Simulate.change(radioButton3)
      await wait()
      expect(radioButton3.checked).toEqual(true)
      expect(radioButton4.checked).toEqual(false)
      ReactDomTestUtils.Simulate.change(radioButton4)
      await wait()
      expect(radioButton3.checked).toEqual(false)
      expect(radioButton4.checked).toEqual(true)
    })
  })
})
