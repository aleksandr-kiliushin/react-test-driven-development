import assert from "node:assert"
import ReactDom from "react-dom/client"

export interface ICreateContainerResult<FormIds extends string[]> {
  container: HTMLDivElement
  findForm(params: { id: FormIds[keyof FormIds] }): HTMLFormElement // TODO: Add generic to accept only particular form ids.
  render: ReactDom.Root["render"]
}

export const createContainer = (): ICreateContainerResult<string[]> => {
  const container = document.createElement("div")
  const root = ReactDom.createRoot(container)

  const findForm: ICreateContainerResult<string[]>["findForm"] = ({ id }) => {
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
