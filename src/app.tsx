import { Calendar } from "./pages/calendar/calendar"
import { AuthPage } from "./pages/auth/auth-page"
import { Route, Routes } from "react-router-dom"
import { AlertHelper } from "./shared/helpers/alert/ui/alert-helper"
import { useAuthorization } from "./features/auth/lib/use-authorization"
import { SuggestionHelper } from "./shared/helpers/suggestion/ui/suggestion-helper"
import { useEffect } from "react"
import { useUserStore } from "./shared/model/user-store"
import { Menu } from "./widgets/menu/ui/menu"

export function App() {
  // запрашиваем новый токен
  const { isRefreshed } = useAuthorization()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {})
  }, [])

  const { accessToken } = useUserStore()

  if (!isRefreshed && accessToken) {
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
