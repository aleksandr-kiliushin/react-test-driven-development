import React from "react"

interface ErrorMessageProps {
  message: string | undefined
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (message === undefined) return null
  if (message === "") return null
  return <p className="error text-red-700">{message}</p>
}
