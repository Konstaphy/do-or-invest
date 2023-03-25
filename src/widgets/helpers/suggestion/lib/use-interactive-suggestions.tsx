import { openSuggestion } from "../model/suggestion-store"
import { useState, useEffect } from "react"

export const SuggestionActions = {
  userOpenedMenu: "userOpenedMenu",
  userCreatedTask: "userCreatedTask",
} as const

export type SuggestionActions = keyof typeof SuggestionActions

export const useInteractiveSuggestions = () => {
  const [shownSuggestionThisSession, setShownSuggestionsThisSession] =
    useState<boolean>(false)

  useEffect(() => {
    const didUserOpenMenu = Boolean(
      localStorage.getItem(SuggestionActions.userOpenedMenu),
    )
    if (!didUserOpenMenu) {
      setShownSuggestionsThisSession(true)
      openSuggestion(
        "Доступны новые возможности!",
        "Нажмите на 'h', чтобы открыть меню и просмотреть список возможных действий",
      )
    }
    const userCreatedTask = Boolean(
      localStorage.getItem(SuggestionActions.userCreatedTask),
    )
    if (!userCreatedTask && !shownSuggestionThisSession) {
      setShownSuggestionsThisSession(true)
      openSuggestion(
        "Добавьте новую задачу!",
        "Нажмите на + вверху экрана, чтобы добавить новое событие",
      )
    }
  }, [])
}
