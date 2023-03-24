import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { openErrorAlert } from "../../../shared/helpers/alert/model/alert-store"

export const useAuthorization = () => {
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
  }, [accessToken])

  return { accessToken }
}
