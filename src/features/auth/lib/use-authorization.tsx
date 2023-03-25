import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
      setRefreshed(true)
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
      })
      .catch(() => {
        localStorage.removeItem("accessToken")
      })
      .finally(() => setRefreshed(true))
  }, [])

  return { isRefreshed }
}
