import React, { useState } from "react"
import { connect } from "react-redux"

import { IScript } from "#types/language-interpreter/IScript"

const ifEnterKey = (event: React.KeyboardEvent<HTMLInputElement>, onEnterPress: () => void) => {
  if (event.key !== "Enter") return
  onEnterPress()
}

interface IScriptNameProps {
  name: string
  promptFocusRequest(): void
  submitScriptName(updatedScriptName: string): void
}

const _ScriptName: React.FC<IScriptNameProps> = ({ name, promptFocusRequest, submitScriptName }) => {
  const [updatedScriptName, setScriptName] = useState(name)
  const [editingScriptName, setEditingScriptName] = useState(false)

  const toggleEditingScriptName = () => setEditingScriptName(!editingScriptName)

  const completeEditingScriptName = () => {
    if (editingScriptName) {
      toggleEditingScriptName()
      submitScriptName(updatedScriptName)
      promptFocusRequest()
    }
  }

  const beginEditingScriptName = () => {
    toggleEditingScriptName()
  }

  return (
    <input
      className={editingScriptName ? "isEditing" : ""}
      id="name"
      onBlur={completeEditingScriptName}
      onChange={(e) => setScriptName(e.target.value)}
      onFocus={beginEditingScriptName}
      onKeyPress={(e) => ifEnterKey(e, completeEditingScriptName)}
      value={updatedScriptName}
    />
  )
}

const mapStateToProps = ({ script: { name } }: { script: IScript }) => ({ name })
const mapDispatchToProps = {
  submitScriptName: (updatedScriptName: string) => ({ text: updatedScriptName, type: "SUBMIT_SCRIPT_NAME" }),
  promptFocusRequest: () => ({ type: "PROMPT_FOCUS_REQUEST" }),
}

export const ScriptName = connect(mapStateToProps, mapDispatchToProps)(_ScriptName)
