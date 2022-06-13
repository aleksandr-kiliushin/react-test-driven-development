import React from "react"
import ReactDom from "react-dom/client"

import Appointment from "./Appointment"
import { appointment1, appointment2 } from "./sampleData"

const wait = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}

describe("Appointment", () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement("div")
  })

  const render = (component: React.ReactElement) => {
    const root = ReactDom.createRoot(container)
    root.render(component)
  }

  it("renders a customer first name", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()
    expect(container.textContent).toMatch(appointment1.customer.firstName)
  })

  it("renders another customer first name", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()
    expect(container.textContent).toMatch(appointment2.customer.firstName)
  })
})
