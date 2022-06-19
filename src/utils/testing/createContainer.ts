import assert from "node:assert"
import ReactDom from "react-dom/client"
import ReactDomTestUtils, { act } from "react-dom/test-utils"

export interface IRenderContainer<ContainerContentConfig extends { fieldNames: string[]; formIds: string[] }> {
  container: HTMLDivElement
  findElement(selector: string): Element | null
  findElements(selector: string): Element[]
  findField: (params: {
    formId: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLInputElement | HTMLSelectElement
  findFieldLabel: (params: {
    formId: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLLabelElement
  findForm: (params: {
    id: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
  }) => HTMLFormElement
  render: ReactDom.Root["render"]
  renderAndWait(children: React.ReactNode): Promise<void>
  simulateChange(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateClick(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateSubmit(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): void
  simulateSubmitAndWait(element: Element, eventData?: ReactDomTestUtils.SyntheticEventData): Promise<void>
}

type IAbstractRenderContainer = IRenderContainer<any>

export const createContainer = (): IAbstractRenderContainer => {
  const container = document.createElement("div")
  const root = ReactDom.createRoot(container)

  const render: IAbstractRenderContainer["render"] = (aComponent) => {
    act(() => {
      root.render(aComponent)
    })
  }

  const renderAndWait: IAbstractRenderContainer["renderAndWait"] = async (aComponent) => {
    await act(async () => {
      root.render(aComponent)
    })
  }

  const findElement: IAbstractRenderContainer["findElement"] = (selector: string) => {
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

  const findFieldLabel: IAbstractRenderContainer["findFieldLabel"] = ({ fieldName, formId }) => {
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
    render,
    renderAndWait,
    simulateChange: createEventSimulator("change"),
    simulateClick: createEventSimulator("click"),
    simulateSubmit: createEventSimulator("submit"),
    simulateSubmitAndWait: createAsyncEventSimulator("submit"),
  }
}
