import React, { PropsWithChildren } from "react"
import "./offset.css"

type Offset = "s" | "m" | "l" | "xl"

type OffsetProps = {
  offsetHorizontal: Offset
  offsetVertical: Offset
}
export const Offset: React.FC<PropsWithChildren<OffsetProps>> = ({
  offsetHorizontal,
  offsetVertical,
  children,
}) => {
  return (
    <div className={`v-${offsetHorizontal} h-${offsetVertical}`}>
      {children}
    </div>
  )
}
