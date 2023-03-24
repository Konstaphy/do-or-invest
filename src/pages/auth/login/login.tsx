import { useNavigate } from "react-router-dom"
import { AuthTransport } from "../../../features/auth/api/auth-transport"

export const Login = () => {
  const navigate = useNavigate()
  const login = () => {
    const transport = new AuthTransport()
    transport
      .login("Konstaphy", "454222")
      .then((res) => {
        localStorage.setItem("accessToken", res.access_token)
        navigate("/")
      })
      .catch(() => {
        console.error("Произошла ошибка при логине")
      })
  }
  return <button onClick={login}>Login</button>
}
