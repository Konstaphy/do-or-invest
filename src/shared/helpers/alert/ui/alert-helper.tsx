import { createPortal } from "react-dom"
import { useAlertStore } from "../model/alert-store"
import { useEffect } from "react"
import "./alert.css"

export const AlertHelper = () => {
  const { content, closeAlert, type } = useAlertStore()
  useEffect(() => {
    if (!!content) {
      setTimeout(() => {
        closeAlert()
      }, 1000)
    }
  }, [content])

  return createPortal(
    <div className={`alert ${!!content ? "open" : undefined} ${type}`}>
      {content}
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  )
}
