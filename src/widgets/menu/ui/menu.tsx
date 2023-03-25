import { useEffect, useState, useLayoutEffect } from "react"
import "./menu.css"
import { SuggestionActions } from "../../helpers/suggestion/lib/use-interactive-suggestions"

export const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useLayoutEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      // Если открыт портал или вводится инпут, то не надо ничего делать
      if (
        e.target !== document.body ||
        document.body.contains(document.querySelector("div.portal-background"))
      ) {
        return
      }

      if (e.key === "h" || e.key === "р") {
        localStorage.setItem(SuggestionActions.userOpenedMenu, "true")
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
