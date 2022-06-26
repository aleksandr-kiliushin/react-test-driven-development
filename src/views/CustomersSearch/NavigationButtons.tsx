import React from "react"
import { Link, useSearchParams } from "react-router-dom"

interface INavigationButtonsProps {
  onNextButtonClick(): void
  onPreviousButtonClick(): void
}

export const NavigationButtons: React.FC<INavigationButtonsProps> = ({ onNextButtonClick, onPreviousButtonClick }) => {
  const [searchParams] = useSearchParams()

  const pageNumberSearchParam = searchParams.get("page")

  if (pageNumberSearchParam === null) return null

  const pageNumber = parseInt(pageNumberSearchParam)

  return (
    <div className="button-bar">
      {pageNumberSearchParam !== "1" && (
        <Link
          className="bg-red-200 hover:bg-red-400"
          id="previous-page"
          onClick={onPreviousButtonClick}
          to={`/customers-search?page=${pageNumber - 1}`}
        >
          Previous
        </Link>
      )}
      <Link
        className="bg-cyan-200 hover:bg-cyan-400"
        id="next-page"
        onClick={onNextButtonClick}
        to={`/customers-search?page=${pageNumber + 1}`}
      >
        Next
      </Link>
    </div>
  )
}
