import { BrowserHistory } from "history"
import React from "react"
import { Router } from "react-router-dom"

export interface HistoryRouterProps {
  basename?: string
  children: React.ReactNode
  history: BrowserHistory
}

export const HistoryRouter = ({ basename = "/", children, history }: HistoryRouterProps) => {
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })

  React.useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}
