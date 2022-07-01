import React from "react"
import { Route, Routes } from "react-router-dom"

import { LanguageInterpreter } from "./language-interpreter"
import { Salon } from "./salon"

export const App = () => {
  return (
    <Routes>
      <Route element={<Salon />} path="/salon/*" />
      <Route element={<LanguageInterpreter />} path="/lang-interpreter/*" />
    </Routes>
  )
}
