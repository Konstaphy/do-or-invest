import { Calendar } from "./widgets/calendar/calendar"
import { useEffect } from "react"
import axios from "axios"
import { AuthPage } from "./pages/auth-page"
import { Route, Routes, useNavigate } from "react-router-dom"
import { AlertHelper } from "./shared/helpers/alert/ui/alert-helper"
import { openErrorAlert } from "./shared/helpers/alert/model/alert-store"

export function App() {
  // проверяем при первом запуске нет ли пройденных ивентов
  // если есть то + штраф в зависимости от приоритета
  // это все через бек

  // проверяем не затух ли токен
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    if (!accessToken) {
      console.error("Unauthenticated")
      return
    }
    axios
      .get("http://127.0.0.1:8080/users/refresh", {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data)
        return res.data
      })
      .catch(() => {
        localStorage.removeItem("accessToken")
      })
  }, [accessToken])

  const navigate = useNavigate()
  useEffect(() => {
    if (!accessToken) {
      openErrorAlert("Вы не зарегистрированы")
      navigate("/auth")
    }
  }, [])

  return (
    <div className="main">
      <AlertHelper />
      <Routes>
        <Route path={"/"} element={<Calendar />}></Route>
        <Route path={"/auth"} element={<AuthPage />}></Route>
      </Routes>
    </div>
  )
}
