import React from "react"

import { StaticLines } from "../src/StaticLines"
import { createContainer } from "./domManipulators"
import { diagonalLine, horizontalLine, verticalLine } from "./sampleLines"

describe.skip("StaticLines", () => {
  let container, render

  beforeEach(() => {
    ;({ container, render } = createContainer())
  })

  const renderSvg = (component) => render(<svg>{component}</svg>)
  const line = () => container.querySelector("line")
  const allLines = () => container.querySelectorAll("line")

  it("renders a line with the line coordinates", () => {
    renderSvg(<StaticLines lineCommands={[horizontalLine]} />)
    expect(line()).not.toBeNull()
    expect(line().getAttribute("x1")).toEqual("100")
    expect(line().getAttribute("y1")).toEqual("100")
    expect(line().getAttribute("x2")).toEqual("200")
    expect(line().getAttribute("y2")).toEqual("100")
  })

  it("sets a stroke width of 2", () => {
    renderSvg(<StaticLines lineCommands={[horizontalLine]} />)
    expect(line().getAttribute("stroke-width")).toEqual("2")
  })

  it("sets a stroke color of black", () => {
    renderSvg(<StaticLines lineCommands={[horizontalLine]} />)
    expect(line().getAttribute("stroke")).toEqual("black")
  })

  it("draws every drawLine command", () => {
    renderSvg(<StaticLines lineCommands={[horizontalLine, verticalLine, diagonalLine]} />)
    expect(allLines().length).toEqual(3)
  })
})
