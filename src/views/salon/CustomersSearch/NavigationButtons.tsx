import { flow } from "lodash"
import React from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"

const getAnotherPageUrl = ({ currentUrl, direction }: { currentUrl: string; direction: "next" | "previous" }) => {
  const pageNumberModifier = flow(
    parseInt,
    (currentPageNumber) => {
      if (direction === "next") return currentPageNumber + 1
      if (direction === "previous") return currentPageNumber - 1
      return currentPageNumber
    },
    String
  )
  return currentUrl.replace(/(?<=page=)\d+/, pageNumberModifier)
}

export const NavigationButtons: React.FC = ({}) => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const currentUrl = location.pathname + location.search

  return (
    <div className="button-bar">
      {searchParams.get("page") !== "1" && (
        <Link
          className="bg-red-200 hover:bg-red-400"
          id="previous-page"
          to={getAnotherPageUrl({ currentUrl, direction: "previous" })}
        >
          Previous
        </Link>
      )}
      <Link
        className="bg-cyan-200 hover:bg-cyan-400"
        id="next-page"
        to={getAnotherPageUrl({ currentUrl, direction: "next" })}
      >
        Next
      </Link>
    </div>
  )
}
