import { Calendar } from "./widgets/calendar/calendar"
import { AuthPage } from "./pages/auth-page"
import { Route, Routes } from "react-router-dom"
import { AlertHelper } from "./shared/helpers/alert/ui/alert-helper"
import { useAuthorization } from "./features/auth/lib/use-authorization"
import { SuggestionHelper } from "./shared/helpers/suggestion/ui/suggestion-helper"

export function App() {
  // запрашиваем новый токен
  useAuthorization()

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
