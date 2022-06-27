import { noop } from "lodash"
import assert from "node:assert"
import React from "react"

import { aCustomer1 } from "#sampleData/someCustomers"
import {
  aTimeSlotAtHannaIn6DaysAt_13_00,
  aTimeSlotAtHannaTodayAt_13_30,
  aTimeSlotAtSuzanInTwoDaysAt_12_00,
  aTimeSlotAtSuzanTodayAt_12_00,
} from "#sampleData/someTimeSlots"
import { IRenderContainer, createContainer } from "#utils/testing/createContainer"
import { createFetchSuccessfulResponse, getRequestBodyOf } from "#utils/testing/spyHelpers"

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
  customer: aCustomer1,
  defaultServiceName: "Blow-dry",
  onAppointmentCreated: noop,
  salonClosesAt: 14,
  salonOpensAt: 12,
  today: new Date(),
}

type IAppointmentFormRenderContainer = IRenderContainer<{ formIds: ["appointment"]; fieldNames: IFieldName[] }>

describe("AppointmentForm", () => {
  let findElement: IAppointmentFormRenderContainer["findElement"]
  let findElements: IAppointmentFormRenderContainer["findElements"]
  let findField: IAppointmentFormRenderContainer["findField"]
  let findLabel: IAppointmentFormRenderContainer["findLabel"]
  let findForm: IAppointmentFormRenderContainer["findForm"]
  let render: IAppointmentFormRenderContainer["render"]
  let simulateChange: IAppointmentFormRenderContainer["simulateChange"]
  let simulateSubmit: IAppointmentFormRenderContainer["simulateSubmit"]

  beforeEach(() => {
    ;({ findElement, findElements, findField, findLabel, findForm, render, simulateChange, simulateSubmit } =
      createContainer())
    jest.spyOn(globalThis, "fetch").mockReturnValue(createFetchSuccessfulResponse() as Promise<Response>)
  })

  afterEach(() => {
    ;(globalThis.fetch as jest.Mock).mockRestore()
  })

  const findSelectOption = ({
    optionTextContent,
    selectFieldName,
  }: {
    optionTextContent: string
    selectFieldName: IFieldName
  }): HTMLOptionElement => {
    const selectField = findField({ fieldName: selectFieldName, formId: "appointment" })
    const options = Array.from(selectField.children)
    const foundOption = options.find((option) => option.textContent === optionTextContent)
    assert(foundOption !== undefined, `An option with specified textContent (${optionTextContent}) not found.`)
    assert(
      foundOption instanceof HTMLOptionElement,
      `An element with specified textContent (${optionTextContent}) is not a select option.`
    )
    return foundOption
  }

  const findTimeSlotRadioButton = ({ inputValue }: { inputValue: string }): HTMLInputElement => {
    const theInput = findElement(`input[type="radio"][name="startsAt"][value="${inputValue}"]`)
    assert(
      theInput instanceof HTMLInputElement,
      `Could not find a startsAtDate radio input with value of ${inputValue}.`
    )
    return theInput
  }

  const selectStylist = (aStylistName: "Hanna" | "Suzan"): void => {
    simulateChange(findField({ fieldName: "stylistName", formId: "appointment" }), { target: { value: aStylistName } })
  }

  const selectService = (aServiceName: "Cut" | "Blow-dry"): void => {
    simulateChange(findField({ fieldName: "serviceName", formId: "appointment" }), { target: { value: aServiceName } })
  }

  it("renders a form.", () => {
    render(<AppointmentForm {...appointmentFormDefaultProps} />)
    expect(findForm({ id: "appointment" })).not.toBeNull()
  })

  describe("service field", () => {
    it("renders as a select box", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findField({ fieldName: "serviceName", formId: "appointment" })).not.toBeNull()
    })

    it("lists all salon services", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const optionNodes = Array.from(findField({ fieldName: "serviceName", formId: "appointment" }).childNodes)
      const renderedServices = optionNodes.map((node) => node.textContent)
      expect(renderedServices).toEqual(expect.arrayContaining(appointmentFormDefaultProps.availableServiceNames))
    })

    it("pre-selects the existing value", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const selectOption = findSelectOption({
        optionTextContent: appointmentFormDefaultProps.defaultServiceName,
        selectFieldName: "serviceName",
      })
      expect(selectOption.textContent).toEqual(appointmentFormDefaultProps.defaultServiceName)
      expect(selectOption.selected).toEqual(true)
    })

    it("renders a field label with an appropriate htmlFor attribute", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findLabel({ fieldName: "serviceName" })).not.toBeNull()
    })

    it("assign label htmlFor matching to the select field ID", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const field = findField({ fieldName: "serviceName", formId: "appointment" })
      const label = findLabel({ fieldName: "serviceName" })
      expect(label.htmlFor).toEqual(field.id)
    })

    it("saves the default service name when the form is submitted", () => {
      const onAppointmentCreatedSpy = jest.fn()
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy).toHaveBeenCalledWith(
        expect.objectContaining({ serviceName: appointmentFormDefaultProps.defaultServiceName })
      )
    })

    it("saves the new entered service name when the form is submitted", () => {
      const onAppointmentCreatedSpy = jest.fn()
      const aNewEnteredServiceName = "Cut"
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      selectService(aNewEnteredServiceName)
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy).toHaveBeenCalledWith(
        expect.objectContaining({ serviceName: aNewEnteredServiceName })
      )
    })
  })

  describe("stylist field", () => {
    it("renders as a select box", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findField({ fieldName: "stylistName", formId: "appointment" })).not.toBeNull()
    })

    it("renders a field label with an appropriate htmlFor attribute", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findLabel({ fieldName: "stylistName" })).not.toBeNull()
    })

    it("assign label htmlFor matching to the select field ID", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const field = findField({ fieldName: "serviceName", formId: "appointment" })
      const label = findLabel({ fieldName: "serviceName" })
      expect(label.htmlFor).toEqual(field.id)
    })

    it("initialized with the 'Not selected' option", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findField({ fieldName: "stylistName", formId: "appointment" }).value).toEqual("Not selected")
    })

    it("onSubmit contains 'Not selected' stylist when the form is submitted with no stylist selected", () => {
      const onAppointmentCreatedSpy = jest.fn()
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy).toHaveBeenCalledWith(expect.objectContaining({ stylistName: "Not selected" }))
    })

    it("from start, has only 'Suzan' stylistName available, because only she is certified for 'Blow-dry'", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const optionNodes = Array.from(findField({ fieldName: "stylistName", formId: "appointment" }).childNodes)
      const availableStylistsNames = optionNodes.map((node) => node.textContent)
      expect(availableStylistsNames).toEqual(["Not selected", "Suzan"])
    })

    it("allows selecting 'Hanna' and 'Suzan' serviceNames when 'Cut' service is choosen, because they both are certified for 'Cut'", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      selectService("Cut")
      const optionNodes = Array.from(findField({ fieldName: "stylistName", formId: "appointment" }).childNodes)
      const availableStylistsNames = optionNodes.map((node) => node.textContent)
      expect(availableStylistsNames).toEqual(["Not selected", "Hanna", "Suzan"])
    })

    it("submits with a newly selected stylistName", () => {
      const onAppointmentCreatedSpy = jest.fn()
      const aNewlySelectedStylistName = "Hanna"
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      selectService("Cut")
      selectStylist(aNewlySelectedStylistName)
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy).toHaveBeenCalledWith(
        expect.objectContaining({ stylistName: aNewlySelectedStylistName })
      )
    })
  })

  describe("timeslots table", () => {
    it("renders", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findElement("table#time-slots")).not.toBeNull()
    })

    it("renders a time slot for every half an hour between open and close times", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const timesOfDay = findElements("tbody >* th")
      expect(timesOfDay).toHaveLength(4)
      expect(timesOfDay[0].textContent).toEqual("12:00")
      expect(timesOfDay[1].textContent).toEqual("12:30")
      expect(timesOfDay[3].textContent).toEqual("13:30")
    })

    it("renders a table cell in quantity of = N timeslots per a day * 7 days", () => {
      const { salonClosesAt, salonOpensAt } = appointmentFormDefaultProps
      const anAppointmentDuration = 0.5
      const daysAmount = 7
      const slotsPerADayAmount = (salonClosesAt - salonOpensAt) / anAppointmentDuration
      const cellsAmount = slotsPerADayAmount * daysAmount
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findElements("td")).toHaveLength(cellsAmount)
    })

    it("renders an empty cell at the start of the header row", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      const headerRow = findElement("thead > tr")
      assert(headerRow instanceof HTMLTableRowElement)
      assert(headerRow.firstChild instanceof HTMLTableCellElement)
      expect(headerRow.firstChild.tagName).toEqual("TH")
      expect(headerRow.firstChild.textContent).toEqual("")
    })

    it("renders a week of available dates", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} today={new Date(2018, 11, 1)} />)
      const dates = findElements("thead >* th:not(:first-child)")
      expect(dates).toHaveLength(7)
      expect(dates[0].textContent).toEqual("Sat 01")
      expect(dates[1].textContent).toEqual("Sun 02")
      expect(dates[6].textContent).toEqual("Fri 07")
    })

    it("does not render radio buttons stylistName is not selected", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      expect(findElements("table input")).toHaveLength(0)
    })

    it("for each provided availableDate renders a radio button with the corresponding `value` attribute", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)
      selectStylist("Hanna")
      expect(findElements('input[type="radio"]')).toHaveLength(2)
    })

    it("submits with a undefined value if no value was selected", () => {
      const onAppointmentCreatedSpy = jest.fn()
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy.mock.calls[0][0].startsAtDate).toBeUndefined()
    })

    it("submits with a newly selected value if a new value was selected.", () => {
      const onAppointmentCreatedSpy = jest.fn()
      const aNewlySelectedTimeSlotStartsAtValue = aTimeSlotAtHannaTodayAt_13_30.startsAt
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      selectStylist("Hanna")
      simulateChange(findTimeSlotRadioButton({ inputValue: aNewlySelectedTimeSlotStartsAtValue.toString() }))
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy.mock.calls[0][0].startsAtDate.toString()).toEqual(
        aNewlySelectedTimeSlotStartsAtValue.toString()
      )
    })

    it("submits with a another newly selected value if a new value was selected.", () => {
      const onAppointmentCreatedSpy = jest.fn()
      render(<AppointmentForm {...appointmentFormDefaultProps} onAppointmentCreated={onAppointmentCreatedSpy} />)
      selectStylist("Hanna")
      simulateChange(findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaTodayAt_13_30.startsAt.toString() }))
      simulateChange(findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.toString() }))
      selectStylist("Suzan")
      simulateChange(findTimeSlotRadioButton({ inputValue: aTimeSlotAtSuzanTodayAt_12_00.startsAt.toString() }))
      simulateSubmit(findForm({ id: "appointment" }))
      expect(onAppointmentCreatedSpy.mock.calls[0][0].startsAtDate.toString()).toEqual(
        aTimeSlotAtSuzanTodayAt_12_00.startsAt.toString()
      )
    })

    it("renders input radio buttons as checked after click on them.", () => {
      render(<AppointmentForm {...appointmentFormDefaultProps} />)

      selectStylist("Suzan")
      const radioButton1 = findTimeSlotRadioButton({ inputValue: aTimeSlotAtSuzanTodayAt_12_00.startsAt.toString() })
      const radioButton2 = findTimeSlotRadioButton({
        inputValue: aTimeSlotAtSuzanInTwoDaysAt_12_00.startsAt.toString(),
      })
      expect(radioButton1.checked).toEqual(false)
      expect(radioButton2.checked).toEqual(false)
      simulateChange(radioButton1)
      expect(radioButton1.checked).toEqual(true)
      expect(radioButton2.checked).toEqual(false)
      simulateChange(radioButton2)
      expect(radioButton1.checked).toEqual(false)
      expect(radioButton2.checked).toEqual(true)

      selectStylist("Hanna")
      const radioButton3 = findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaTodayAt_13_30.startsAt.toString() })
      const radioButton4 = findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.toString() })
      expect(radioButton3.checked).toEqual(false)
      expect(radioButton4.checked).toEqual(false)
      simulateChange(radioButton3)
      expect(radioButton3.checked).toEqual(true)
      expect(radioButton4.checked).toEqual(false)
      simulateChange(radioButton4)
      expect(radioButton3.checked).toEqual(false)
      expect(radioButton4.checked).toEqual(true)
    })
  })

  it("sends entered data to '/api/appointments' via POST", () => {
    render(<AppointmentForm {...appointmentFormDefaultProps} />)
    selectService("Cut")
    selectStylist("Hanna")
    simulateChange(findTimeSlotRadioButton({ inputValue: aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.toString() }))
    simulateSubmit(findForm({ id: "appointment" }))
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/appointments",
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
    )
    const requestBody = JSON.parse((globalThis.fetch as jest.Mock).mock.calls[0][1].body)
    expect(requestBody).toMatchObject({
      serviceName: "Cut",
      startsAtDate: aTimeSlotAtHannaIn6DaysAt_13_00.startsAt.toString(),
      stylistName: "Hanna",
    })
  })

  it("passes the customer id to fetch when submitting", () => {
    render(<AppointmentForm {...appointmentFormDefaultProps} />)
    simulateSubmit(findForm({ id: "appointment" }))
    expect(getRequestBodyOf(globalThis.fetch as jest.Mock)).toMatchObject({ customerId: aCustomer1.id })
  })
})
