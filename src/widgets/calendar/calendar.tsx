import React, { useMemo, useEffect, useState } from "react"
import { getToday } from "../../shared/date-utils"
import { Day } from "./day"
import "./calendar.css"
import dayjs from "dayjs"
import { AddNewEventModal } from "../add-new-event-modal/add-new-event-modal"
import axios from "axios"
import { DayEvent } from "../../shared/common-types"
import { Button } from "../../shared/ui/button/button"

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

  const [events, setEvents] = useState<DayEvent[]>([])

  // useEffect(() => {
  //   axios
  //     .post("http://127.0.0.1:5000/event/new", { hello: "world" })
  //     .then(console.log)
  //     .catch((e) => console.log(e))
  // }, [])
  useEffect(() => {
    axios
      .get<{
        events: {
          title: string
          day: string
          id: string
        }[]
      }>("http://127.0.0.1:5000/event")
      .then((res) => setEvents(res.data.events))
      .catch((e) => console.log(e))
  }, [])

  return (
    <div className={"calendar"}>
      <AddNewEventModal
        setEvents={setEvents}
        setIsShown={setModalShown}
        isShown={isModalShown}
      />
      <div className={"calendar-header"}>
        <div className={"calendar-info"}>
          <h3>{currentDay.month}</h3>
          <p>Сегодня: {currentDay.weekDay}</p>
        </div>
        <Button onClick={() => setModalShown(true)} circle>
          +
        </Button>
      </div>
      <div className={"calendar--box"}>
        {firstWeekButPastMonthDays.map((v, i) => (
          <Day day={-1} key={`${i}-pastMonthDay`} />
        ))}
        {dayArray.map((v) => (
          <Day
            events={events?.filter((e) => {
              const thatDate = `${
                currentDay.source.month() + 1
              }-${v}-${currentDay.source.year()}`
              const thatDay = dayjs(thatDate)
              const eventDay = dayjs(e.day, "yyyy-MM-dd")

              return eventDay.diff(thatDay) === 0
            })}
            day={v}
            key={v}
          />
        ))}
      </div>
    </div>
  )
}
