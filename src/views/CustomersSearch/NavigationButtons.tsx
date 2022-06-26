import React from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"

export const NavigationButtons: React.FC = ({}) => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const pageNumberSearchParam = searchParams.get("page")

  return (
    <div className="button-bar">
      {pageNumberSearchParam !== "1" && (
        <Link
          className="bg-red-200 hover:bg-red-400"
          id="previous-page"
          to={(location.pathname + location.search).replace(/(?<=page=)\d+/, (aMatch) => String(parseInt(aMatch) - 1))}
        >
          Previous
        </Link>
      )}
      <Link
        className="bg-cyan-200 hover:bg-cyan-400"
        id="next-page"
        to={(location.pathname + location.search).replace(/(?<=page=)\d+/, (aMatch) => String(parseInt(aMatch) + 1))}
      >
        Next
      </Link>
    </div>
  )
}
