import { IScript } from "#types/language-interpreter/IScript"

import { builtInFunctions } from "./language/functionTable"
import { parseAndSaveStatement } from "./language/parseCall"
import initialText from "./other/code-examples/initial-text.lgo"

interface IState {
  parsedTokens: IScript["parsedTokens"]
}

export const emptyState = {
  allFunctions: builtInFunctions,
  collectedParameters: {},
  drawCommands: [],
  name: "Unnamed script",
  nextDrawCommandId: 0,
  nextInstructionId: 0,
  parsedStatements: [],
  parsedTokens: [],
  pen: { down: true },
  turtle: { x: 0, y: 0, angle: 0 },
}

const tokenizeLine = (line: string, lastLineNumber: number) => {
  const tokenRegExp = new RegExp(/(\S+)|\n/gm)
  const tokens = []
  let lastIndex = 0
  let match
  let lineNumber = lastLineNumber + 1
  while ((match = tokenRegExp.exec(line)) != null) {
    if (match.index > lastIndex) {
      tokens.push({
        lineNumber: lineNumber,
        text: line.substring(lastIndex, match.index),
        type: "whitespace",
      })
    }
    if (match[0] === "\n") {
      tokens.push({
        lineNumber: lineNumber++,
        text: match[0],
        type: "whitespace",
      })
    } else {
      tokens.push({
        lineNumber: lineNumber,
        text: match[0],
        type: "token",
      })
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < line.length) {
    tokens.push({
      lineNumber: lineNumber,
      text: line.substring(lastIndex),
      type: "whitespace",
    })
  }
  return tokens
}

export const initialState = {
  ...emptyState,
  parsedTokens: tokenizeLine(initialText, 0),
}

const lastLineNumber = ({ parsedTokens }: IState) => {
  return parsedTokens.reduce((highest, token) => {
    if (token.lineNumber > highest) {
      return token.lineNumber
    }
    return highest
  }, 0)
}

export const parseStatement = (line: string, state: IState) => {
  try {
    return parseTokens(tokenizeLine(line, lastLineNumber(state)), state)
  } catch (error) {
    // @ts-ignore
    return { ...state, error: { ...error, line } }
  }
}

export const parseTokens = (tokens: IScript["parsedTokens"], state: IState) => {
  const updatedState = tokens.reduce(parseAndSaveStatement, state)
  if (updatedState.currentInstruction) {
    return state
  }
  return updatedState
}
