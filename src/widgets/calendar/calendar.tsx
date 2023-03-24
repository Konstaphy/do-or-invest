import React, { useMemo, useEffect, useState, useCallback } from "react"
import {
  getToday,
  getMonthDuration,
  MonthFromNumber,
} from "../../shared/lib/date-utils"
import { Day } from "./day"
import "./calendar.css"
import dayjs from "dayjs"
import { AddNewEventModal } from "../add-new-event-modal/add-new-event-modal"
import axios from "axios"
import { DayEvent } from "../../shared/model/common-types"
import { Button } from "../../shared/ui/button/button"
import { AuthTransport } from "../../features/auth/api/auth-transport"
import {
  openSuggestion,
  closeSuggestion,
} from "../../shared/helpers/suggestion/model/suggestion-store"

export const Calendar: React.FC = () => {
  const [penalty, setPenalty] = useState<number>(0)
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
      .get<DayEvent[]>("http://127.0.0.1:8080/events/", {
        withCredentials: true,
      })
      .then((res) => setEvents(res.data))
      .catch((e) => console.log(e))
      .then(() => {
        axios
          .get("http://127.0.0.1:8080/events/check-expired", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          })
          .then((res) => setEvents(res.data))
      })
  }, [])

  useEffect(() => {
    if (events.length === 0) {
      openSuggestion(
        "Создайте новое событие!",
        'Нажмите на значок "+" и выберите необходимые параметры',
      )
    } else {
      closeSuggestion()
    }
  }, [events])

  useEffect(() => {
    const transport = new AuthTransport()
    transport.getPenalty().then((res) => setPenalty(res.penalty))
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
          <div>
            Ваш общий штраф ={" "}
            <strong style={{ color: "darkred" }}>{penalty}</strong>
          </div>
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
