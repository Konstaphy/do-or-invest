import { createPortal } from "react-dom"
import React from "react"
import "./modal.css"

type PortalProps = {
  isShown: boolean
  setIsShown: (v: boolean) => void
  children: React.ReactElement
}

export const Modal: React.FC<PortalProps> = ({
  isShown,
  setIsShown,
  children,
}) => {
  if (!isShown) {
    return null
  }
  return createPortal(
    <div className={"portal-background"} onClick={() => setIsShown(false)}>
      <div className={"portal-content"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  )
}
