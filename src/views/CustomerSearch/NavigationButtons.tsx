import React from "react"
import { Link, useSearchParams } from "react-router-dom"

interface INavigationButtonsProps {
  onNextButtonClick(): void
  onPreviousButtonClick(): void
}

export const NavigationButtons: React.FC<INavigationButtonsProps> = ({ onNextButtonClick, onPreviousButtonClick }) => {
  let [searchParams, setSearchParams] = useSearchParams()

  const pageNumberSearchParam = searchParams.get("page")

  React.useEffect(() => {
    if (
      pageNumberSearchParam !== null &&
      !isNaN(parseInt(pageNumberSearchParam)) &&
      parseInt(pageNumberSearchParam) >= 1
    )
      return
    setSearchParams({ page: "1" })
  }, [pageNumberSearchParam])

  if (pageNumberSearchParam === null) return null

  return (
    <div className="button-bar">
      <Link
        className={`bg-red-200 hover:bg-red-400 ${pageNumberSearchParam === "1" && "invisible"}`}
        id="previous-page"
        onClick={onPreviousButtonClick}
        to="/customers-search"
      >
        Previous
      </Link>
      <Link className="bg-cyan-200 hover:bg-cyan-400" id="next-page" onClick={onNextButtonClick} to="/customers-search">
        Next
      </Link>
    </div>
  )
}
