import React from "react"
import { Link, useSearchParams } from "react-router-dom"

export const NavigationButtons: React.FC = ({}) => {
  const [searchParams] = useSearchParams()

  const pageNumberSearchParam = searchParams.get("page")
  const searchTermSearchParam = searchParams.get("searchTerm")

  if (pageNumberSearchParam === null) return null

  const pageNumber = parseInt(pageNumberSearchParam)

  return (
    <div className="button-bar">
      {pageNumberSearchParam !== "1" && (
        <Link
          className="bg-red-200 hover:bg-red-400"
          id="previous-page"
          to={`/customers-search?page=${pageNumber - 1}${
            searchTermSearchParam ? `&searchTerm=${searchTermSearchParam}` : ""
          }`}
        >
          Previous
        </Link>
      )}
      <Link
        className="bg-cyan-200 hover:bg-cyan-400"
        id="next-page"
        to={`/customers-search?page=${pageNumber + 1}${
          searchTermSearchParam ? `&searchTerm=${searchTermSearchParam}` : ""
        }`}
      >
        Next
      </Link>
    </div>
  )
}
