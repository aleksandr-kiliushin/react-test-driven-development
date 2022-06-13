import ReactDom from "react-dom/client"

type CreateContainer = () => {
  container: HTMLDivElement
  render: ReactDom.Root["render"]
}

const createContainer: CreateContainer = () => {
  const container = document.createElement("div")
  const root = ReactDom.createRoot(container)

  return {
    container,
    render: (aComponent) => root.render(aComponent),
  }
}

export default createContainer