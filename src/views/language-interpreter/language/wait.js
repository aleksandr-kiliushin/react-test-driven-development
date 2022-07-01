import { parseCall } from "./parseCall"
import { integerParameterValue } from "./values"

const waitCommand = (state, seconds) => ({
  drawCommand: "wait",
  seconds: seconds.get(state),
})

export const wait = {
  names: ["wait", "wt"],
  isWriteProtected: true,
  initial: {},
  parseToken: parseCall,
  parameters: ["seconds"],
  perform: (state) => ({
    drawCommands: [...state.drawCommands, waitCommand(state, integerParameterValue("seconds"))],
  }),
}
