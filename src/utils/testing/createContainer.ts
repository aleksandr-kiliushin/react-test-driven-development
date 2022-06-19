import assert from "node:assert"
import ReactDom from "react-dom/client"
import ReactDomTestUtils, { act } from "react-dom/test-utils"

export interface IRenderContainer<ContainerContentConfig extends { fieldNames: string[]; formIds: string[] }> {
  container: HTMLDivElement
  findElement(selector: string): Element
  findElements(selector: string): Element[]
  findField: (params: {
    formId: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLInputElement
  findFieldLabel: (params: {
    formId: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLLabelElement
  findForm: (params: {
    id: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
  }) => HTMLFormElement
  render: ReactDom.Root["render"]
  simulateChange(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateClick(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateSubmit(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateSubmitAndWait(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): Promise<void>
}

type IAbstractRenderContainer = IRenderContainer<any>

export const createContainer = (): IAbstractRenderContainer => {
  const container = document.createElement("div")
  const root = ReactDom.createRoot(container)

  const findElement: IAbstractRenderContainer["findElement"] = (selector: string) => {
    const element = container.querySelector(selector)
    assert(element instanceof Element, `Cannot find an element with selector of [${selector}].`)
    return element
  }

  const findElements: IAbstractRenderContainer["findElements"] = (selector: string) => {
    const elements = container.querySelectorAll(selector)
    return Array.from(elements)
  }

  const findField: IAbstractRenderContainer["findField"] = ({ fieldName, formId }) => {
    const field = findForm({ id: formId }).elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, `Cannot find a field with fieldName of [${fieldName}].`)
    return field
  }

  const findFieldLabel: IAbstractRenderContainer["findFieldLabel"] = ({ fieldName }) => {
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
    findFieldLabel,
    findForm,
    render: (aComponent) => {
      root.render(aComponent)
    },
    simulateChange: createEventSimulator("change"),
    simulateClick: createEventSimulator("click"),
    simulateSubmit: createEventSimulator("submit"),
    simulateSubmitAndWait: createAsyncEventSimulator("submit"),
  }
}
