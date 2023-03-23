import { createPortal } from "react-dom"
import React, { useEffect } from "react"
import "./modal.css"

export type PortalProps = {
  isShown: boolean
  setIsShown: (v: boolean) => void
  children: React.ReactElement | React.ReactElement[]
  title?: string
  button?: React.ReactElement
}

export const Modal: React.FC<PortalProps> = ({
  isShown,
  setIsShown,
  children,
  title,
  button,
}) => {
  // Дизейблим скролл при появлении модалки
  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "auto"
      }
    }
  }, [isShown])

  if (!isShown) {
    return null
  }
  return createPortal(
    <div className={"portal-background"} onClick={() => setIsShown(false)}>
      <div className={"portal-content"} onClick={(e) => e.stopPropagation()}>
        {title && <p className={"portal-title"}>{title}</p>}
        {children}
        {button && <div className={"portal-footer"}>{button}</div>}
      </div>
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  )
}
