import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"

import { IScript } from "#types/language-interpreter/IScript"

interface IPromptProps {
  nextInstructionId: unknown
  promptFocusRequest: unknown
  submitEditLine(TODO_giveAName: string): void
  promptHasFocused(): void
  startAnimating(): void
}

const _Prompt: React.FC<IPromptProps> = ({
  nextInstructionId,
  promptFocusRequest,
  submitEditLine,
  promptHasFocused,
  startAnimating,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      setShouldSubmit(true)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditPrompt(event.target.value)
    if (shouldSubmit) {
      startAnimating()
      submitEditLine(event.target.value)
      setShouldSubmit(false)
    }
  }

  // @ts-ignore
  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement, UIEvent>) => setHeight(event.target.scrollHeight)

  const [editPrompt, setEditPrompt] = useState("")
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const [currentInstructionId, setCurrentInstructionId] = useState(nextInstructionId)

  const [height, setHeight] = useState(20)

  if (currentInstructionId != nextInstructionId) {
    setCurrentInstructionId(nextInstructionId)
    setEditPrompt("")
    setHeight(20)
  }

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current === null) return
    inputRef.current.focus()
  }, [inputRef])

  useEffect(() => {
    if (inputRef.current === null) return
    inputRef.current.focus()
    promptHasFocused()
  }, [promptFocusRequest, promptHasFocused])

  return (
    <tbody key="prompt">
      <tr>
        <td className="promptIndicator">&gt;</td>
        <td>
          <textarea
            onScroll={handleScroll}
            value={editPrompt}
            ref={inputRef}
            style={{ height: height }}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </td>
      </tr>
    </tbody>
  )
}

const mapStateToProps = ({
  environment: { promptFocusRequest },
  script: { nextInstructionId },
}: {
  environment: { promptFocusRequest(): void }
  script: IScript
}) => ({
  nextInstructionId,
  promptFocusRequest,
})
const mapDispatchToProps = {
  promptHasFocused: () => ({ type: "PROMPT_HAS_FOCUSED" }),
  submitEditLine: (text: string) => ({ type: "SUBMIT_EDIT_LINE", text }),
  startAnimating: () => ({ type: "START_ANIMATING" }),
}

export const Prompt = connect(mapStateToProps, mapDispatchToProps)(_Prompt)
