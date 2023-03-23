import { useState } from "react"
import { Login } from "./login/login"
import { SignUp } from "./sign-up/sign-up"

type AuthType = "login" | "sign-up"

export const AuthPage = () => {
  const [type, setType] = useState<AuthType>("login")

  return (
    <div className={"main"}>
      <p onClick={() => setType("login")}>Login</p>
      <p onClick={() => setType("sign-up")}>Sign-up</p>
      {type === "login" && <Login />}
      {type === "sign-up" && <SignUp />}
    </div>
  )
}
