import React from "react"

import { IDrawCommand } from "#types/language-interpreter/IDrawCommand"

interface IStaticLinesProps {
  lineCommands: IDrawCommand[]
}

export const StaticLines: React.FC<IStaticLinesProps> = ({ lineCommands }) => {
  return (
    <>
      {lineCommands.map(({ id, x1, y1, x2, y2 }) => (
        <line key={id} stroke="black" strokeWidth="2" x1={x1} x2={x2} y1={y1} y2={y2} />
      ))}
    </>
  )
}
