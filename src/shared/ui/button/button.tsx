import React, { PropsWithChildren } from "react"
import "./button.css"

type ButtonProps = {
  circle?: boolean
  onClick?: VoidFunction
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  circle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={circle ? "button-customized circle" : "button-customized"}
    >
      {children}
    </button>
  )
}
