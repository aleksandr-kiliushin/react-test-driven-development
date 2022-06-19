import assert from "node:assert"
import ReactDom from "react-dom/client"

export interface ICreateContainerResult<ContainerContentConfig extends { formIds: string[] }> {
  container: HTMLDivElement
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

  return {
    container,
    findForm,
    render: (aComponent) => {
      root.render(aComponent)
    },
  }
}
