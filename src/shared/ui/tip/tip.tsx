import React, { Ref, MutableRefObject, PropsWithChildren } from "react"
import "./tip.css"
import { createPortal } from "react-dom"

type TipProps = {
  isShown: boolean
  element: HTMLElement | null
}

export const Tip: React.FC<PropsWithChildren<TipProps>> = ({
  element,
  isShown,
  children,
}) => {
  if (!element || !isShown) {
    return null
  }
  const isInLeftSide = window.innerWidth - element?.offsetLeft - 200 > 0
  return createPortal(
    <div
      style={{
        position: "absolute",
        top: element.offsetTop - 20,
        left: element.offsetLeft + (isInLeftSide ? 10 : -210),
      }}
      className="tip"
    >
      {children}
    </div>,
    document.body,
  )
}
