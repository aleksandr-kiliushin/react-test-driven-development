import React from "react"

interface INavigationButtonsProps {
  onNextButtonClick(): void
  onPreviousButtonClick(): void
}

export const NavigationButtons: React.FC<INavigationButtonsProps> = ({ onNextButtonClick, onPreviousButtonClick }) => (
  <div className="button-bar">
    <button className="bg-red-200 hover:bg-red-400" id="previous-page" onClick={onPreviousButtonClick} role="button">
      Previous
    </button>
    <button className="bg-cyan-200 hover:bg-cyan-400" id="next-page" onClick={onNextButtonClick} role="button">
      Next
    </button>
  </div>
)
