import React from "react"
import { Link } from "react-router-dom"

interface INavigationButtonsProps {
  onNextButtonClick(): void
  onPreviousButtonClick(): void
}

export const NavigationButtons: React.FC<INavigationButtonsProps> = ({ onNextButtonClick, onPreviousButtonClick }) => (
  <div className="button-bar">
    <Link
      className="bg-red-200 hover:bg-red-400"
      id="previous-page"
      onClick={onPreviousButtonClick}
      role="button"
      to="/customers-search"
    >
      Previous
    </Link>
    <Link
      className="bg-cyan-200 hover:bg-cyan-400"
      id="next-page"
      onClick={onNextButtonClick}
      role="button"
      to="/customers-search"
    >
      Next
    </Link>
  </div>
)
