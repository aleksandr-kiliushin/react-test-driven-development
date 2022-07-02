export interface IDrawCommand {
  drawCommand: "drawLine" | "rotate"
  id: number
  newAngle: number
  previousAngle: number
  x1: number
  x2: number
  y1: number
  y2: number
}
