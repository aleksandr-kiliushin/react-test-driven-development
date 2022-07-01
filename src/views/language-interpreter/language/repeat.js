import { parseCall } from "./parseCall"
import { performAll } from "./perform"
import { integerParameterValue, parameterValue } from "./values"

const flatten = (array) => array.reduce((flattened, latest) => [...flattened, ...latest])
const duplicateArrayItems = (array, times) => flatten(Array(times).fill(array))

export const repeat = {
  names: ["repeat", "rp"],
  isWriteProtected: true,
  parameters: ["times", "statements"],
  parseToken: parseCall,
  perform: (state) =>
    performAll(
      state,
      duplicateArrayItems(parameterValue("statements").get(state), integerParameterValue("times").get(state))
    ),
}
