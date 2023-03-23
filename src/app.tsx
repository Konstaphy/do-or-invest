import { Calendar } from "./widgets/calendar/calendar"
import { useEffect, useState } from "react"
import axios from "axios"
import sha256 from "crypto-js/sha256"
import { AuthPage } from "./pages/auth-page"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"

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
    if (!accessToken) navigate("/auth")
  }, [])

  return (
    <div className="main">
      <Routes>
        <Route path={"/"} element={<Calendar />}></Route>
        <Route path={"/auth"} element={<AuthPage />}></Route>
      </Routes>
    </div>
  )
}
