import { useState, useEffect } from "react"
import { AuthTransport } from "../api/auth-transport"

export const usePenalty = () => {
  const [penalty, setPenalty] = useState<number>(0)
  useEffect(() => {
    const transport = new AuthTransport()
    transport.getPenalty().then((res) => setPenalty(res.penalty))
  }, [])
  return { penalty }
}
