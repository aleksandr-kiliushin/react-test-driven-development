import { isPageNumberSearchParamValid } from "./isPageNumberSearchParamValid"

describe("isPageNumberParamValid", () => {
  it.each<{ validationResult: boolean; param: string | null }>([
    { param: null, validationResult: false },
    { param: "Hello", validationResult: false },
    { param: "-123", validationResult: false },
    { param: "0", validationResult: false },
    { param: "Hello123", validationResult: false },
    { param: "_3132", validationResult: false },
    { param: "3132_", validationResult: false },
    { param: "31_32", validationResult: false },
    { param: "_31_32_", validationResult: false },
    { param: "1", validationResult: true },
    { param: "6", validationResult: true },
  ])("is page number $param valid? $validationResult", ({ param, validationResult }) => {
    expect(isPageNumberSearchParamValid(param)).toEqual(validationResult)
  })
})
