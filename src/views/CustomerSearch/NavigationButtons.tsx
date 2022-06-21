import React from "react"

interface INavigationButtonsProps {
  onNextButtonClick(): void
  onPreviousButtonClick(): void
}

export const NavigationButtons: React.FC<INavigationButtonsProps> = ({ onNextButtonClick, onPreviousButtonClick }) => (
  <div className="button-bar">
    <button id="previous-page" onClick={onPreviousButtonClick} role="button">
      Previous
    </button>
    <button id="next-page" onClick={onNextButtonClick} role="button">
      Next
    </button>
  </div>
)
