import React, { useMemo, useEffect, useState } from "react"
import { getToday } from "../../shared/date-utils"
import { Day } from "./day"
import "./calendar.css"
import dayjs from "dayjs"
import { AddNewEventModal } from "../add-new-event-modal/add-new-event-modal"

export const Calendar: React.FC = () => {
  const [isModalShown, setModalShown] = useState(false)

  // Текущий день
  const currentDay = useMemo(() => {
    return getToday()
  }, [])

  // Массив всех дней в текущем месяце
  const dayArray = useMemo(() => {
    const time = currentDay.source.daysInMonth()
    return new Array(time).fill(0).map((v, i) => i + 1)
  }, [])

  // Массив дней которые относятся к прошлому месяцу
  const firstWeekButPastMonthDays = useMemo(() => {
    const daysCount = dayjs().add(-currentDay.day, "d").day()
    return new Array(daysCount).fill(0).map((v, i) => i + 1)
  }, [])

  // useEffect(() => {
  //   axios
  //     .post("http://127.0.0.1:5000/event/new", { hello: "world" })
  //     .then(console.log)
  //     .catch((e) => console.log(e))
  // }, [])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => {
        return res.json()
      })
      .then(console.log)
      .catch((e) => console.log(e))
  }, [])

  return (
    <div className={"calendar"}>
      <p>{currentDay.month}</p>
      <p>Сегодня: {currentDay.weekDay}</p>
      <AddNewEventModal setIsShown={setModalShown} isShown={isModalShown} />
      <button onClick={() => setModalShown(true)}>Plus</button>
      <div className={"calendar--box"}>
        {firstWeekButPastMonthDays.map((v, i) => (
          <Day day={-1} key={`${i}-pastMonthDay`} />
        ))}
        {dayArray.map((v) => (
          <Day day={v} key={v} />
        ))}
      </div>
    </div>
  )
}
