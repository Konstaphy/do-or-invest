import { Calendar } from "./pages/calendar/calendar"
import { AuthPage } from "./pages/auth/auth-page"
import { Route, Routes } from "react-router-dom"
import { AlertHelper } from "./widgets/helpers/alert/ui/alert-helper"
import { useAuthorization } from "./features/auth/lib/use-authorization"
import { SuggestionHelper } from "./widgets/helpers/suggestion/ui/suggestion-helper"
import { Menu } from "./widgets/menu/ui/menu"

export function App() {
  // запрашиваем новый токен
  const { isRefreshed } = useAuthorization()
  // const navigate = useNavigate()
  // const { accessToken } = useUserStore()

  if (!isRefreshed) {
    return <div>loading</div>
  }

  // if (!accessToken) {
  //   navigate("/auth")
  // }

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
