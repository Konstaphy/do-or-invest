import { useEffect, useState } from "react"
import "./menu.css"

export const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      if (e.key === "h") {
        setIsOpen(!isOpen)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleClick)
    return () => {
      document.removeEventListener("keydown", handleClick)
    }
  }, [setIsOpen, isOpen])

  if (!isOpen) {
    return null
  }
  return <div className={"menu"}>123</div>
}
