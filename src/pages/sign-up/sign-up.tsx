import axios from "axios"
import sha256 from "crypto-js/sha256"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
  const navigate = useNavigate()
  const signUp = () => {
    axios
      .post(
        "http://127.0.0.1:8080/users/sign-up",
        { email: "Konstaphy@gmail.com" },
        {
          auth: {
            username: "Konstaphy",
            password: sha256("454222").toString(),
          },
          withCredentials: true,
        },
      )
      .then(() => {
        navigate("/")
      })
  }
  return <button onClick={signUp}>SignUp</button>
}
