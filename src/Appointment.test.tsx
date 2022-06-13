import React from "react"
import ReactDOM from "react-dom/client"

import { Appointment } from "./Appointment"

const wait = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
}

describe("Appointment", () => {
  let container: HTMLDivElement
  let root: ReactDOM.Root

  beforeEach(() => {
    container = document.createElement("div")
    root = ReactDOM.createRoot(container)
  })

  it("renders a customer first name", async () => {
    root.render(<Appointment customer={{ firstName: "Ashley" }} />)

    await wait()

    expect(container.textContent).toMatch("Ashley")
  })

  it("renders another customer first name", async () => {
    root.render(<Appointment customer={{ firstName: "Jordan" }} />)

    await wait()

    expect(container.textContent).toMatch("Jordan")
  })
})
