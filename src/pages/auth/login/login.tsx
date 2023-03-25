import { useNavigate } from "react-router-dom"
import { AuthTransport } from "../../../features/auth/api/auth-transport"
import { useUserStore } from "../../../shared/model/user-store"

export const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  const login = () => {
    const transport = new AuthTransport()
    transport
      .login("Konstaphy", "454222")
      .then((res) => {
        localStorage.setItem("accessToken", res.access_token)
        setUser({
          username: res.username,
          accessToken: res.access_token,
          id: res.id,
          email: null,
        })
        navigate("/")
      })
      .catch(() => {
        console.error("Произошла ошибка при логине")
      })
  }
  return <button onClick={login}>Login</button>
}
