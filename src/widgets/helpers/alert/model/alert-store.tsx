import { create } from "zustand"
import React from "react"

type AlertType = "success" | "error"

type AlertStore = {
  content: React.ReactElement | null
  type: AlertType
  openAlert: (v: React.ReactElement, type?: AlertType) => void
  closeAlert: () => void
}

export const openErrorAlert = (v: string) =>
  useAlertStore.getState().openAlert(<p>{v}</p>)
export const openSuccessAlert = (v: string) =>
  useAlertStore.getState().openAlert(<p>{v}</p>, "success")

export const useAlertStore = create<AlertStore>((set) => ({
  isAlertOpen: false,
  content: null,
  type: "error",
  openAlert: (v: React.ReactElement, type?: AlertType) =>
    set({ content: v, type: type || "error" }),
  closeAlert: () => set({ content: null, type: "error" }),
}))
