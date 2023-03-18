import { getToday } from "../../shared/date-utils"
import React from "react"
import "./day.css"

export function Day(props: {
  day: number
  events?: {
    title: string
    day: string
    id: string
  }[]
}) {
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

      {props.events?.map((ev) => {
        return <p style={{ fontSize: "12px", color: "#0008" }}> {ev.title} </p>
      })}
    </div>
  )
}
