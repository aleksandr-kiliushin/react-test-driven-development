import React from "react"
import ReactDom from "react-dom/client"

import Appointment from "./Appointment"

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
    render(
      <Appointment
        appointment={{
          customer: { firstName: "Ashley" },
          startsAt: 100,
        }}
      />
    )

    await wait()

    expect(container.textContent).toMatch("Ashley")
  })

  it("renders another customer first name", async () => {
    render(
      <Appointment
        appointment={{
          customer: { firstName: "Jordan" },
          startsAt: 100,
        }}
      />
    )

    await wait()

    expect(container.textContent).toMatch("Jordan")
  })
})
