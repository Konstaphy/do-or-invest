import { Calendar } from "./pages/calendar/calendar"
import { AuthPage } from "./pages/auth/auth-page"
import { Route, Routes } from "react-router-dom"
import { AlertHelper } from "./shared/helpers/alert/ui/alert-helper"
import { useAuthorization } from "./features/auth/lib/use-authorization"
import { SuggestionHelper } from "./shared/helpers/suggestion/ui/suggestion-helper"
import { useEffect } from "react"

export function App() {
  // запрашиваем новый токен
  useAuthorization()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {})
  }, [])

  return (
    <div className="main">
      <AlertHelper />
      <SuggestionHelper />
      <Routes>
        <Route path={"/"} element={<Calendar />}></Route>
        <Route path={"/auth"} element={<AuthPage />}></Route>
      </Routes>
    </div>
  )
}
