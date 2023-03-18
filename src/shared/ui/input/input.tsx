import React from "react"
import "./input.css"

type InputProps = {
  value: string | null
  setValue: (v: string | null) => void
  type: string
  title?: string
}

export const Input: React.FC<InputProps> = ({
  value,
  setValue,
  type,
  title,
}) => {
  return (
    <div className={"input-box"}>
      {title ? <p className={"input-title"}>{title}</p> : null}
      <input
        type={type}
        placeholder={title}
        className={"input-customized"}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
