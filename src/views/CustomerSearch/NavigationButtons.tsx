import React from "react"

interface INavigationButtonsProps {
  onNextButtonClick(): void
}

export const NavigationButtons: React.FC<INavigationButtonsProps> = ({ onNextButtonClick }) => (
  <div className="button-bar">
    <button id="next-page" onClick={onNextButtonClick} role="button">
      Next
    </button>
  </div>
)
