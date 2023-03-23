import { create } from "zustand"
import React from "react"

type AlertType = "success" | "error"

type AlertStore = {
  isAlertOpen: boolean
  element: React.ReactElement | null
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
  element: null,
  type: "error",
  openAlert: (v: React.ReactElement, type?: AlertType) =>
    set({ isAlertOpen: true, element: v, type: type || "error" }),
  closeAlert: () => set({ isAlertOpen: false, element: null, type: "error" }),
}))
