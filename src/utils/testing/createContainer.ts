import assert from "node:assert"
import ReactDom from "react-dom/client"

export interface ICreateContainerResult<ContainerContentConfig extends { fieldNames: string[]; formIds: string[] }> {
  container: HTMLDivElement
  findField: (params: {
    formId: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
    fieldName: ContainerContentConfig["fieldNames"][keyof ContainerContentConfig["fieldNames"]]
  }) => HTMLInputElement
  findForm: (params: {
    id: ContainerContentConfig["formIds"][keyof ContainerContentConfig["formIds"]]
  }) => HTMLFormElement
  render: ReactDom.Root["render"]
}

export const createContainer = (): ICreateContainerResult<any> => {
  const container = document.createElement("div")
  const root = ReactDom.createRoot(container)

  const findForm: ICreateContainerResult<any>["findForm"] = ({ id }) => {
    const form = container.querySelector(`form#${id}`)
    assert(form instanceof HTMLFormElement, `Cannot find a form with ID of [${id}].`)
    return form
  }

  const findField: ICreateContainerResult<any>["findField"] = ({ fieldName, formId }): HTMLInputElement => {
    const field = findForm({ id: formId }).elements.namedItem(fieldName)
    assert(field instanceof HTMLInputElement, `Cannot find a field with fieldName of [${fieldName}].`)
    return field
  }

  return {
    container,
    findField,
    findForm,
    render: (aComponent) => {
      root.render(aComponent)
    },
  }
}
