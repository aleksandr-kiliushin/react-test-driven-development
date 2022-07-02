import React, { useState } from "react"
import { connect } from "react-redux"

import { IScript } from "#types/language-interpreter/IScript"

import { Dialog } from "./Dialog"

interface IEnvironment {
  isSharing: boolean
  isWatching: boolean
  shouldAnimate: boolean
  url: string
}

interface IMenuButtonsProps {
  environment: IEnvironment
  redo(): void
  reset(): void
  script: IScript
  skipAnimating(): void
  startSharing(button: "reset"): void
  stopSharing(): void
  undo(): void
}

const _MenuButtons: React.FC<IMenuButtonsProps> = ({
  environment,
  redo,
  reset,
  script: { canUndo, canRedo, nextInstructionId },
  skipAnimating,
  startSharing,
  stopSharing,
  undo,
}) => {
  const canReset = nextInstructionId !== 0

  const [isSharingDialogOpen, setIsSharingDialogOpen] = useState(false)

  const openSharingDialog = () => setIsSharingDialogOpen(true)

  return (
    <>
      {environment.isSharing ? (
        <p>
          You are now presenting your script.<a href={environment.url}>Here's the URL for sharing.</a>
        </p>
      ) : null}
      {environment.isWatching ? <p>You are now watching the session</p> : null}
      <button onClick={skipAnimating} disabled={!environment.shouldAnimate}>
        Skip animation
      </button>
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <button onClick={reset} disabled={!canReset}>
        Reset
      </button>
      {environment.isSharing ? (
        <button id="stopSharing" onClick={stopSharing}>
          Stop sharing
        </button>
      ) : (
        <button id="startSharing" onClick={openSharingDialog}>
          Start sharing
        </button>
      )}
      {isSharingDialogOpen ? (
        <Dialog
          onClose={() => setIsSharingDialogOpen(false)}
          onChoose={startSharing}
          message="Do you want to share your previous commands, or would you like to reset to a blank script?"
          buttons={[
            { id: "keep", text: "Share previous" },
            { id: "reset", text: "Reset" },
          ]}
        />
      ) : null}
    </>
  )
}

const mapStateToProps = ({ environment, script }: { environment: IEnvironment; script: IScript }) => ({
  environment,
  script,
})
const mapDispatchToProps = {
  redo: () => ({ type: "REDO" }),
  reset: () => ({ type: "RESET" }),
  skipAnimating: () => ({ type: "SKIP_ANIMATING" }),
  // startSharing: () => ({ type: "START_SHARING" }),
  startSharing: (button: "reset") => ({
    type: "START_SHARING",
    reset: button === "reset",
  }),
  stopSharing: () => ({ type: "STOP_SHARING" }),
  undo: () => ({ type: "UNDO" }),
}

export const MenuButtons = connect(mapStateToProps, mapDispatchToProps)(_MenuButtons)
