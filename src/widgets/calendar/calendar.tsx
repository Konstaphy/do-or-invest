import React, { useMemo, useEffect, useState, useCallback } from "react"
import {
  getToday,
  getMonthDuration,
  MonthFromNumber,
} from "../../shared/date-utils"
import { Day } from "./day"
import "./calendar.css"
import dayjs from "dayjs"
import { AddNewEventModal } from "../add-new-event-modal/add-new-event-modal"
import axios from "axios"
import { DayEvent } from "../../shared/common-types"
import { Button } from "../../shared/ui/button/button"

export const Calendar: React.FC = () => {
  // Текущий день
  const currentDay = useMemo(() => {
    return getToday()
  }, [])

  //Выбранный месяц и год
  const [currentMonth, setCurrentMonth] = useState(currentDay.source.month())
  const [currentYear, setCurrentYear] = useState(currentDay.source.year())

  // Массив всех дней в текущем месяце
  const dayArray = useMemo(() => {
    const daysInMonth = getMonthDuration(currentMonth, currentYear)
    return new Array(daysInMonth).fill(0).map((v, i) => i + 1)
  }, [])

  // Массив дней которые относятся к прошлому месяцу
  const firstWeekButPastMonthDays = useMemo(() => {
    const daysCountIndexed = dayjs(
      `${currentMonth + 1}-01-${currentYear}`,
    ).day()
    const daysCount = daysCountIndexed === 0 ? 6 : daysCountIndexed - 1
    return new Array(daysCount).fill(0).map((v, i) => i + 1)
  }, [currentMonth, currentYear])

  // Все события и флаг открыта ли модалка нового события
  const [events, setEvents] = useState<DayEvent[]>([])
  const [isModalShown, setModalShown] = useState(false)

  const getNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }, [currentMonth, currentYear])
  const getPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }, [currentMonth, currentYear])

  // запрашиваем все события
  useEffect(() => {
    axios
      .get<DayEvent[]>("http://127.0.0.1:8080/event", { withCredentials: true })
      .then((res) => setEvents(res.data))
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
          <h3>
            {MonthFromNumber[currentMonth]}, {currentYear}
          </h3>
          <p>
            Сегодня: {currentDay.weekDay}, {currentDay.month},{" "}
            <strong>{currentDay.day} число</strong>
          </p>
        </div>
        <div className={"calendar-month-choosing"}>
          <p onClick={getPrevMonth}>Предыдущий месяц</p>
          <p onClick={getNextMonth}>Следующий месяц</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setModalShown(true)} circle>
            +
          </Button>
        </div>
      </div>
      <div className={"calendar--box"}>
        {firstWeekButPastMonthDays.map((v, i) => (
          <Day
            year={currentYear}
            month={currentMonth + 1}
            day={-1}
            key={`${i}-pastMonthDay`}
          />
        ))}
        {dayArray.map((v) => (
          <Day
            year={currentYear}
            month={currentMonth + 1}
            events={events?.filter((e) => {
              const thatDate = `${currentMonth + 1}-${v}-${currentYear}`
              const thatDay = dayjs(thatDate, "MM-DD-YYYY")?.format(
                "YYYY-MM-DD",
              )
              const eventDay = dayjs(e.date, "YYYY-MM-DD HH:mm:ss").format(
                "YYYY-MM-DD",
              )
              return thatDay === eventDay
            })}
            day={v}
            key={v}
          />
        ))}
      </div>
    </div>
  )
}
