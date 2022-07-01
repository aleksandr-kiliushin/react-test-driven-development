import { clearScreen } from "../../src/language/clearScreen"
import { builtInFunctions, functionWithName } from "../../src/language/functionTable"

describe.skip("built-in functions", () => {
  it("contains clearScreen", () => {
    expect(builtInFunctions).toContain(clearScreen)
  })
})

describe.skip("functionWithName", () => {
  it("matches function with a non-lowercase name", () => {
    const expectedFunction = { names: ["aBC"] }
    const functions = [expectedFunction]
    expect(functionWithName("ABC", functions)).toBe(expectedFunction)
  })
})
