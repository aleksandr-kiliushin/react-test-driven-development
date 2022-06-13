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

  it("renders a customer name", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()
    expect(container.textContent).toMatch(
      `Customer name: ${appointment1.customer.firstName} ${appointment1.customer.lastName}`
    )
  })

  it("renders another customer name", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()
    expect(container.textContent).toMatch(
      `Customer name: ${appointment2.customer.firstName} ${appointment2.customer.lastName}`
    )
  })

  it("renders a customer phone number", async () => {
    render(<Appointment appointment={appointment1} />)
    await wait()
    expect(container.textContent).toMatch(`Customer phone: ${appointment1.customer.phoneNumber}`)
  })

  it("renders another customer phone number", async () => {
    render(<Appointment appointment={appointment2} />)
    await wait()
    expect(container.textContent).toMatch(`Customer phone: ${appointment2.customer.phoneNumber}`)
  })
})
