import { configureStore } from "@reduxjs/toolkit"
import { BrowserHistory, createBrowserHistory } from "history"
import assert from "node:assert"
import React from "react"
import ReactDom from "react-dom/client"
import ReactDomTestUtils, { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { rootReducer } from "#store/rootReducer"

interface IRenderOptions {
  initialUrl?: string
}

type IChangeEventData = ReactDomTestUtils.SyntheticEventData | { target: Partial<HTMLInputElement> }

export interface IRenderContainer<ContainerContentConfig extends { fieldNames: string[]; formIds: string[] }> {
  container: HTMLDivElement
  findElement(selector: string, options?: { failureMessage?: string }): Element
  findElements(selector: string): Element[]
  findField: (params: {
    formId: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLInputElement | HTMLSelectElement
  findLabel: (params: {
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLLabelElement
  findForm: (params: {
    id: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
  }) => HTMLFormElement
  history: BrowserHistory
  queryElement(selector: string): Element | null
  render(children: React.ReactNode, options?: IRenderOptions): void
  renderAndWait(children: React.ReactNode, options?: IRenderOptions): Promise<void>
  simulateBlur(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateChange(element: Element, eventData?: IChangeEventData): void
  simulateChangeAndWait(element: Element, eventData?: IChangeEventData): Promise<void>
  simulateClick(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateClickAndWait(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): Promise<void>
  simulateSubmit(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateSubmitAndWait(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): Promise<void>
}

type IAbstractRenderContainer = IRenderContainer<any>

export const createContainer = (): IAbstractRenderContainer => {
  const container: IAbstractRenderContainer["container"] = document.createElement("div")
  const root = ReactDom.createRoot(container)
  const history: IAbstractRenderContainer["history"] = createBrowserHistory()
  const store = configureStore({ reducer: rootReducer })

  const render: IAbstractRenderContainer["render"] = (aComponent, options) => {
    act(() => {
      root.render(
        <HistoryRouter history={history}>
          <Provider store={store}>{aComponent}</Provider>
        </HistoryRouter>
      )
    })
    act(() => {
      history.push(options?.initialUrl ?? "/")
    })
  }

  const renderAndWait: IAbstractRenderContainer["renderAndWait"] = async (aComponent, options) => {
    await act(async () => {
      root.render(
        <HistoryRouter history={history}>
          <Provider store={store}>{aComponent}</Provider>
        </HistoryRouter>
      )
    })
    await act(async () => {
      history.push(options?.initialUrl ?? "/")
    })
  }

  const findElement: IAbstractRenderContainer["findElement"] = (selector: string, options) => {
    const failureMessage = options?.failureMessage ?? `Can't find an element with the following selector: ${selector}.`
    const theElement = container.querySelector(selector)
    assert(theElement !== null, failureMessage)
    return theElement
  }

  const queryElement: IAbstractRenderContainer["queryElement"] = (selector: string) => {
    return container.querySelector(selector)
  }

  const findElements: IAbstractRenderContainer["findElements"] = (selector: string) => {
    const elements = container.querySelectorAll(selector)
    return Array.from(elements)
  }

  const findField: IAbstractRenderContainer["findField"] = ({ fieldName, formId }) => {
    const field = findForm({ id: formId }).elements.namedItem(fieldName)
    assert(
      field instanceof HTMLInputElement || field instanceof HTMLSelectElement,
      `Cannot find a field with fieldName of [${fieldName}].`
    )
    return field
  }

  const findLabel: IAbstractRenderContainer["findLabel"] = ({ fieldName }) => {
    const label = container.querySelector(`label[for="${fieldName}"]`)
    assert(label instanceof HTMLLabelElement, `Cannot find a label with a [for] attribute of [${fieldName}].`)
    return label
  }

  const findForm: IAbstractRenderContainer["findForm"] = ({ id }) => {
    const form = container.querySelector(`form#${id}`)
    assert(form instanceof HTMLFormElement, `Cannot find a form with ID of [${id}].`)
    return form
  }

  const createEventSimulator = (eventName: keyof typeof ReactDomTestUtils.Simulate) => {
    return (element: Element, eventData?: ReactDomTestUtils.SyntheticEventData) => {
      act(() => {
        ReactDomTestUtils.Simulate[eventName](element, eventData)
      })
    }
  }

  const createAsyncEventSimulator = (eventName: keyof typeof ReactDomTestUtils.Simulate) => {
    return async (element: Element, eventData?: ReactDomTestUtils.SyntheticEventData) => {
      await act(async () => {
        ReactDomTestUtils.Simulate[eventName](element, eventData)
      })
    }
  }

  return {
    container,
    findElement,
    findElements,
    findField,
    findLabel,
    findForm,
    history,
    queryElement,
    render,
    renderAndWait,
    simulateBlur: createEventSimulator("blur"),
    simulateChange: createEventSimulator("change"),
    simulateChangeAndWait: createAsyncEventSimulator("change"),
    simulateClick: createEventSimulator("click"),
    simulateClickAndWait: createAsyncEventSimulator("click"),
    simulateSubmit: createEventSimulator("submit"),
    simulateSubmitAndWait: createAsyncEventSimulator("submit"),
  }
}
