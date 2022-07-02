import React from "react"

interface ITurtleProps {
  angle: number
  x: number
  y: number
}

export const Turtle: React.FC<ITurtleProps> = ({ angle, x, y }) => {
  const buildRotation = ({ angle, x, y }: { angle: number; x: number; y: number }) => `${angle + 90}, ${x}, ${y}`

  return (
    <polygon
      fill="green"
      points={`${x - 5},${y + 5}, ${x},${y - 7}, ${x + 5},${y + 5}`}
      stroke="black"
      strokeWidth="2"
      transform={`rotate(${buildRotation({ angle, x, y })})`}
    />
  )
}
