import { Calendar } from "./pages/calendar/calendar"
import { AuthPage } from "./pages/auth/auth-page"
import { Route, Routes } from "react-router-dom"
import { AlertHelper } from "./widgets/helpers/alert/ui/alert-helper"
import { useAuthorization } from "./features/auth/lib/use-authorization"
import { SuggestionHelper } from "./widgets/helpers/suggestion/ui/suggestion-helper"
import { Menu } from "./widgets/menu/ui/menu"
import { useInteractiveSuggestions } from "./widgets/helpers/suggestion/lib/use-interactive-suggestions"

export function App() {
  // запрашиваем новый токен
  const { isRefreshed } = useAuthorization()
  useInteractiveSuggestions()

  if (!isRefreshed) {
    return <div>loading</div>
  }
  return (
    <div className="main">
      <AlertHelper />
      <SuggestionHelper />
      <Menu />
      <Routes>
        <Route path={"/"} element={<Calendar />}></Route>
        <Route path={"/auth"} element={<AuthPage />}></Route>
      </Routes>
    </div>
  )
}
