import React from "react"

import { Drawing } from "./Drawing"
import { MenuButtons } from "./MenuButtons"
import { Prompt } from "./Prompt"
import { PromptError } from "./PromptError"
import { ScriptName } from "./ScriptName"
import { StatementHistory } from "./StatementHistory"

export const App = () => (
  <div id="mainWindow">
    <div id="menu">
      <ScriptName />
      <MenuButtons />
    </div>
    <div id="drawing">
      <Drawing />
    </div>
    <div id="commands">
      <table>
        <StatementHistory />
        <Prompt />
        <PromptError />
      </table>
    </div>
  </div>
)
