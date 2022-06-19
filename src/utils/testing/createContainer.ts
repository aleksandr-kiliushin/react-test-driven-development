import assert from "node:assert"
import ReactDom from "react-dom/client"

export interface ICreateContainerResult {
  container: HTMLDivElement
  findForm(params: { id: string }): HTMLFormElement // TODO: Add generic to accept only particular form ids.
  render: ReactDom.Root["render"]
}

export const createContainer = (): ICreateContainerResult => {
  const container = document.createElement("div")
  const root = ReactDom.createRoot(container)

  const findForm: ICreateContainerResult["findForm"] = ({ id }) => {
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
