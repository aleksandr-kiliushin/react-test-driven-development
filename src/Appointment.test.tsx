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
  it("renders a customer first name", async () => {
    const container = document.createElement("div")
    const root = ReactDOM.createRoot(container)
    root.render(<Appointment customer={{ firstName: "Ashley" }} />)

    await wait()

    expect(container.textContent).toMatch("Ashley")
  })

  it("renders another customer first name", async () => {
    const container = document.createElement("div")
    const root = ReactDOM.createRoot(container)
    root.render(<Appointment customer={{ firstName: "Jordan" }} />)

    await wait()

    expect(container.textContent).toMatch("Jordan")
  })
})
