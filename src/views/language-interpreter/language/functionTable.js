import { clearScreen } from "./clearScreen"
import { comment } from "./comment"
import { backward, forward, left, right } from "./movement"
import { pendown, penup } from "./pen"
import { repeat } from "./repeat"
import { to } from "./to"
import { wait } from "./wait"

export const functionWithName = (name, functions) => {
  const lowerCaseName = name.toLowerCase()
  return functions.find((f) => f.names.map((name) => name.toLowerCase()).includes(lowerCaseName))
}

export const builtInFunctions = [forward, backward, left, right, wait, penup, pendown, clearScreen, repeat, to, comment]
