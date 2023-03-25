import { getToday } from "../../../shared/lib/date-utils"
import React, { useState } from "react"
import "./day.css"
import axios, { AxiosResponse } from "axios"
import dayjs from "dayjs"
import { DayEvent } from "../../../shared/model/common-types"
import { EventsModal } from "../../modal/events-modal/events-modal"
import { openErrorAlert } from "../../helpers/alert/model/alert-store"
import { useUserStore } from "../../../shared/model/user-store"

export function Day(props: {
  day: number
  month: number
  year: number
  events?: DayEvent[]
}) {
  const [isModalShown, setModalShown] = useState<boolean>(false)
  const [currentEvents, setCurrentEvents] = useState<DayEvent[]>([])
  const { accessToken } = useUserStore()

  const onClick = () => {
    axios
      .post<{ date: unknown }, AxiosResponse<DayEvent[]>>(
        "http://127.0.0.1:8080/events/get-all-by-date",
        {
          date: dayjs(
            `${props.year}-${props.month}-${props.day}`,
            "YYYY-MM-DD 00:00:00",
          ).format("YYYY-MM-DD"),
        },
        { headers: { authorization: `Bearer ${accessToken}` } },
      )
      .then((res) => {
        setCurrentEvents(res.data)
        setModalShown(true)
        if (res.data.length === 0) {
          openErrorAlert("Событий нет!")
        }
      })
      .catch(() => {
        openErrorAlert("Что-то пошло не так :(")
      })
  }

  if (props.day === -1) {
    return (
      <div
        className={`day--box`}
        onClick={() =>
          openErrorAlert("Невозможно посмотреть записи за отличающийся от текущего месяц")
        }
      >
        <p style={{ color: "#0005" }}>Прошлый месяц</p>
      </div>
    )
  }

  return (
    <>
      <EventsModal
        isShown={isModalShown}
        setIsShown={setModalShown}
        events={currentEvents}
      />
      <div
        className={`day--box  ${getToday().day === props.day ? "current" : undefined}`}
        onClick={onClick}
      >
        <p style={{ color: getToday().day === props.day ? "green" : "black" }}>
          {props.day} число
        </p>

        <div className={"day--events"}>
          {props.events?.map((v, i) => {
            if (i > 4) {
              return null
            }
            return (
              <span
                key={v.id}
                className={v.is_expired ? "circle-pseudo red" : "circle-pseudo"}
              ></span>
            )
          })}
          {props.events?.length === 0 ? (
            <p style={{ fontSize: "12px", color: "#0008" }}>Событий нет</p>
          ) : null}
        </div>
      </div>
    </>
  )
}
