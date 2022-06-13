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
  it("renders the customer first name", async () => {
    const container = document.createElement("div")
    container.setAttribute("id", "root")
    document.body.append(container)

    const root = ReactDOM.createRoot(container)
    root.render(<Appointment customer={{ firstName: "Ashley" }} />)

    await wait()

    expect(document.body.textContent).toMatch("Ashley")
  })
})
