import React from "react"

export const CustomerSearch: React.FC = () => {
  React.useEffect(() => {
    globalThis.fetch("/customers", {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone number</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  )
}
