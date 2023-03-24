import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { openErrorAlert } from "../../../shared/helpers/alert/model/alert-store"
import { useUserStore } from "../../../shared/model/user-store"

export const useAuthorization = () => {
  const [isRefreshed, setRefreshed] = useState<boolean>(false)

  const { setUser } = useUserStore()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      console.error("Unauthenticated")
      return
    }

    axios
      .get("http://127.0.0.1:8080/users/refresh", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access_token)
        setUser({
          username: res.data.username,
          id: res.data.id,
          email: null,
          accessToken: res.data.access_token,
        })
        setRefreshed(true)
        return res.data
      })
      .catch(() => {
        localStorage.removeItem("accessToken")
      })
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      openErrorAlert("Вы не зарегистрированы")
      navigate("/auth")
    }
  }, [localStorage.getItem("accessToken")])

  return { isRefreshed }
}
