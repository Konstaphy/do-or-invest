import { useState, useEffect } from "react"
import { Login } from "./login/login"
import { SignUp } from "./sign-up/sign-up"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../shared/model/user-store"

type AuthType = "login" | "sign-up"

export const AuthPage = () => {
  const [type, setType] = useState<AuthType>("login")

  const accessToken = useUserStore((st) => st.accessToken)
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [])

  return (
    <div className={"main"}>
      <p onClick={() => setType("login")}>Login</p>
      <p onClick={() => setType("sign-up")}>Sign-up</p>
      {type === "login" && <Login />}
      {type === "sign-up" && <SignUp />}
    </div>
  )
}
