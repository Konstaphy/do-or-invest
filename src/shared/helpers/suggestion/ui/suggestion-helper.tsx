import { useSuggestionStore } from "../model/suggestion-store"
import { createPortal } from "react-dom"
import "./suggestion.css"

export const SuggestionHelper = () => {
  const { description, closeSuggestion, type, title } = useSuggestionStore()

  if (!title) {
    return null
  }
  return createPortal(
    <div
      className={`suggestion ${!!title ? "open" : undefined} ${type}`}
      onClick={() => closeSuggestion()}
    >
      <p className={"title"}>{title}</p>
      {description && <p className={"description"}>{description}</p>}
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  )
}
