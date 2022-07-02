import React from "react"
import { connect } from "react-redux"

import { IScript } from "#types/language-interpreter/IScript"
import { IToken } from "#types/language-interpreter/IToken"

const groupByLineNumber = (tokens: IScript["parsedTokens"]) => {
  return tokens.reduce<Record<number, IToken[]>>((lines, token) => {
    if (!lines[token.lineNumber]) {
      return { ...lines, [token.lineNumber]: [token] }
    }
    return {
      ...lines,
      [token.lineNumber]: [...lines[token.lineNumber], token],
    }
  }, {})
}

interface ILineWithNumberProps {
  number: number
  tokens: IScript["parsedTokens"]
}
export const LineWithNumber: React.FC<ILineWithNumberProps> = ({ number, tokens }) => {
  const fullTextLine = tokens.map((instruction) => instruction.text).join("")
  return (
    <tr key={number.toString()}>
      <td className="lineNumber">{number}</td>
      <td className="text">{fullTextLine}</td>
    </tr>
  )
}

interface IStatementHistoryProps {
  parsedTokens: IScript["parsedTokens"]
}
const _StatementHistory: React.FC<IStatementHistoryProps> = ({ parsedTokens }) => {
  const lines = groupByLineNumber(parsedTokens)
  return (
    <tbody key="acceptedStatements">
      {Object.keys(lines).map((lineNumber) => (
        <LineWithNumber key={lineNumber} number={parseInt(lineNumber)} tokens={lines[parseInt(lineNumber)]} />
      ))}
    </tbody>
  )
}

const mapStateToProps = ({ script: { parsedTokens } }: { script: IScript }) => ({
  parsedTokens,
})
const mapDispatchToProps = () => ({})

export const StatementHistory = connect(mapStateToProps, mapDispatchToProps)(_StatementHistory)
