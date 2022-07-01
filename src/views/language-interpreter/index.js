import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { App } from "./App"
import { configureStoreWithLocalStorage } from "./store"

const store = configureStoreWithLocalStorage()
store.dispatch({ type: "TRY_START_WATCHING" })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
