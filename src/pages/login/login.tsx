import axios from "axios"
import sha256 from "crypto-js/sha256"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
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
        localStorage.setItem("accessToken", res.data.access_token)
        navigate("/")
      })
      .catch(() => {
        console.error("Произошла ошибка при логине")
      })
  }
  return <button onClick={login}>Login</button>
}
