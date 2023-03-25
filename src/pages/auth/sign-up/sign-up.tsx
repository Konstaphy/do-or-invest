import { useNavigate } from "react-router-dom"
import { AuthTransport } from "../../../features/auth/api/auth-transport"
import { useState } from "react"
import { useUserStore } from "../../../shared/model/user-store"

export const SignUp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const { setUser } = useUserStore()

  const signUp = () => {
    const transport = new AuthTransport()
    transport.signUp(username, password, email).then((res) => {
      localStorage.setItem("accessToken", res.access_token)
      setUser({
        username: res.username,
        accessToken: res.access_token,
        id: res.id,
        email: null,
      })
      navigate("/")
    })
  }
  return (
    <>
      <input
        placeholder={"username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        placeholder={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        value={email}
        placeholder={"email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={signUp}>SignUp</button>
    </>
  )
}
