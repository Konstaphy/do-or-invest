import { useEffect, useState } from "react"
import "./menu.css"
import { openSuggestion } from "../../helpers/suggestion/model/suggestion-store"

export const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    openSuggestion(
      "Откройте меню и откройте новые возможности",
      "Нажмите на 'h', чтобы открыть",
    )
  }, [])
  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      // Если открыт портал или вводится инпут, то не надо ничего делать
      if (
        e.target !== document.body ||
        document.body.contains(document.querySelector("div.portal-background"))
      ) {
        return
      }

      if (e.key === "h" || e.key === "р") {
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
