import React from "react"
import { connect } from "react-redux"

import { IScript } from "#types/language-interpreter/IScript"

interface IPromptErrorProps {
  error: IScript["error"]
}

const _PromptError: React.FC<IPromptErrorProps> = ({ error }) => {
  return (
    <tbody key="error">
      <tr>
        <td colSpan={2}>{error && error.description}</td>
      </tr>
    </tbody>
  )
}

const mapStateToProps = ({ script: { error } }: { script: IScript }) => ({ error })
const mapDispatchToProps = () => ({})

export const PromptError = connect(mapStateToProps, mapDispatchToProps)(_PromptError)
