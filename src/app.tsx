import { Calendar } from "./widgets/calendar/calendar"
import { useEffect, useState } from "react"
import axios from "axios"
import sha256 from "crypto-js/sha256"

export function App() {
  // проверяем при первом запуске нет ли пройденных ивентов
  // если есть то + штраф в зависимости от приоритета
  // это все через бек

  // проверяем не затух ли токен
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  )

  const login = () => {
    axios
      .get<{ access_token: string; id: string }>(
        "http://127.0.0.1:8080/users/login",
        {
          auth: {
            username: "Konstaphy",
            password: sha256("454222").toString(),
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setAccessToken(res.data.access_token)
        localStorage.setItem("accessToken", res.data.access_token)
      })
  }
  const signUp = () => {
    axios
      .post(
        "http://127.0.0.1:8080/users/sign-up",
        { email: "Konstaphy@gmail.com" },
        {
          auth: {
            username: "Konstaphy",
            password: sha256("454222").toString(),
          },
          withCredentials: true,
        },
      )
      .then(console.log)
  }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/users/refresh", {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data)
        setAccessToken(res.data)
      })
      .catch((e) => {
        setAccessToken(null)
        localStorage.removeItem("accessToken")
      })
      .then((res) => {
        axios
          .get("http://127.0.0.1:8080/events/check-expired", {
            headers: { authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          })
          .then(console.log)
      })
  }, [accessToken])

  if (!accessToken)
    return (
      <div className={"main"}>
        <button onClick={login}>Login</button>
        <button onClick={signUp}>SignUp</button>
      </div>
    )
  return (
    <div className="main">
      <Calendar />
    </div>
  )
}
