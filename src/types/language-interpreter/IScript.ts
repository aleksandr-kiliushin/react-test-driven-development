import { IToken } from "./IToken"

export interface IScript {
  canRedo: boolean
  canUndo: boolean
  error: {
    description: string
  }
  name: string
  nextInstructionId: number
  parsedTokens: IToken[]
}
