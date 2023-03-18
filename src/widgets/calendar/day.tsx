import { getToday } from "../../shared/date-utils"
import React from "react"
import "./day.css"

export function Day(props: { day: number }) {
  if (props.day === -1) {
    return (
      <div className={"day--box"}>
        <p style={{ color: "#0005" }}>Прошлый месяц</p>
      </div>
    )
  }
  return (
    <div className={"day--box"}>
      <p style={{ color: getToday().day === props.day ? "green" : "black" }}>
        {props.day} число
      </p>
    </div>
  )
}
