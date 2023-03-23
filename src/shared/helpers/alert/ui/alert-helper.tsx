import { createPortal } from "react-dom"
import { useAlertStore } from "../model/alert-store"
import { useEffect } from "react"
import "./alert.css"

export const AlertHelper = () => {
  const { element, closeAlert, isAlertOpen, type } = useAlertStore()
  useEffect(() => {
    if (isAlertOpen) {
      setTimeout(() => {
        closeAlert()
      }, 1000)
    }
  }, [isAlertOpen])

  return createPortal(
    <div className={`alert ${isAlertOpen ? "open" : undefined} ${type}`}>
      {element}
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  )
}
