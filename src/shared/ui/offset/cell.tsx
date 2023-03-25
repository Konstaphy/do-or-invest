import React, { PropsWithChildren } from "react"
import "./offset.css"

type Offset = "s" | "m" | "l" | "xl"

type OffsetProps = {
  offsetHorizontal: Offset
  offsetVertical: Offset
  onClick?: VoidFunction
  background?: string
}
export const Cell: React.FC<PropsWithChildren<OffsetProps>> = ({
  offsetHorizontal,
  offsetVertical,
  children,
  background,
  onClick,
}) => {
  return (
    <div
      className="cell"
      style={{ backgroundColor: background || "#fff" }}
      onClick={onClick}
    >
      <div className={"cell__on-hover"}>
        <div className={`v-${offsetHorizontal} h-${offsetVertical}`}>{children}</div>
      </div>
    </div>
  )
}
