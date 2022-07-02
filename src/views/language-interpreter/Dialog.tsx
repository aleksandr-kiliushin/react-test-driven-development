import React from "react"

interface IDialogProps {
  buttons: { id: "keep" | "reset"; text: string }[]
  message: string
  onChoose(id: "keep" | "reset"): void
  onClose(): void
}

export const Dialog: React.FC<IDialogProps> = ({ message, buttons, onChoose, onClose }) => {
  return (
    <div className="dialog">
      <p>{message}</p>
      <div className="dialogButtons">
        {buttons.map(({ id, text }) => (
          <button
            id={id.toString()}
            key={id}
            onClick={() => {
              onChoose(id)
              onClose()
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
