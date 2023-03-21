import { getToday } from "../../shared/date-utils"
import React from "react"
import "./day.css"
import axios from "axios"
import dayjs from "dayjs"
import { DayEvent } from "../../shared/common-types"

export function Day(props: {
  day: number
  month: number
  year: number
  events?: DayEvent[]
}) {
  const onClick = () => {
    axios
      .post<{ date: string }>("http://127.0.0.1:8080/event/get-all-by-date", {
        date: dayjs(
          `${props.year}-${props.month}-${props.day}`,
          "YYYY-MM-DD 00:00:00",
        ).format("YYYY-MM-DD"),
      })
      .then(console.log)
  }

  if (props.day === -1) {
    return (
      <div className={"day--box"}>
        <p style={{ color: "#0005" }}>Прошлый месяц</p>
      </div>
    )
  }
  return (
    <div className={"day--box"} onClick={onClick}>
      <p style={{ color: getToday().day === props.day ? "green" : "black" }}>
        {props.day} число
      </p>

      <div className={"day--events"}>
        {props.events?.map((v, i) => {
          if (i > 4) {
            return null
          }
          return <span key={v.id} className={"circle-pseudo"}></span>
        })}
      </div>
      {props.events?.length === 0 ? (
        <p style={{ fontSize: "12px", color: "#0008" }}>Событий нет</p>
      ) : null}
    </div>
  )
}
