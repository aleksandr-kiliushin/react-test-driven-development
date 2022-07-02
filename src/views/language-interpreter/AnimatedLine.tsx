import React from "react"

interface IAnimatedLineProps {
  commandToAnimate: {
    x1: number
    y1: number
  }
  turtle: {
    x: number
    y: number
  }
}

export const AnimatedLine: React.FC<IAnimatedLineProps> = ({ commandToAnimate: { x1, y1 }, turtle: { x, y } }) => {
  return <line x1={x1} y1={y1} x2={x} y2={y} strokeWidth="2" stroke="black" />
}
