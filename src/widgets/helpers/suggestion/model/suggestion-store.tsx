import { create } from "zustand"
import React from "react"

type SuggestionType = "critical" | "basic"

type SuggestionStore = {
  description: string | null
  title: string | null
  type: SuggestionType
  openSuggestion: (
    title: string,
    description?: string,
    type?: SuggestionType,
  ) => void
  closeSuggestion: () => void
}

export const openSuggestion = (
  title: string,
  description?: string,
  type?: SuggestionType,
) => useSuggestionStore.getState().openSuggestion(title, description, type)

export const closeSuggestion = () =>
  useSuggestionStore.getState().closeSuggestion()

export const useSuggestionStore = create<SuggestionStore>((set) => ({
  description: null,
  type: "basic",
  title: null,
  openSuggestion: (
    title: string,
    description?: string,
    type?: SuggestionType,
  ) => set({ description, title, type: type || "basic" }),
  closeSuggestion: () => set({ description: null, type: "basic", title: null }),
}))
