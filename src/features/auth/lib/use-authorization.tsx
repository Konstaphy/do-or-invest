import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { openErrorAlert } from "../../../shared/helpers/alert/model/alert-store"
import { useUserStore } from "../../../shared/model/user-store"
import { AuthTransport } from "../api/auth-transport"

export const useAuthorization = () => {
  const [isRefreshed, setRefreshed] = useState<boolean>(false)
  const { setUser } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    // если токена нет то и запрашивать нечего
    if (!localStorage.getItem("accessToken")) {
      console.error("Unauthenticated")
      return navigate("/auth")
    }

    new AuthTransport()
      .refresh()
      .then((res) => {
        // Мапим токен в локальное хранилище
        localStorage.setItem("accessToken", res.access_token)
        // Получаем данные о пользователе
        setUser({
          username: res.username,
          id: res.id,
          email: null,
          accessToken: res.access_token,
        })
        // Говорим системе что токен актуален
        setRefreshed(true)
      })
      .catch(() => {
        localStorage.removeItem("accessToken")
      })
  }, [])

  return { isRefreshed }
}
