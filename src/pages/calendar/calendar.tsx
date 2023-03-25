import React, { useMemo, useEffect, useState, useCallback } from "react"
import { getToday, getMonthDuration, MonthFromNumber } from "../../shared/lib/date-utils"
import { Day } from "../../widgets/calendar/day/day"
import "./calendar.css"
import dayjs from "dayjs"
import { DayEvent } from "../../shared/model/common-types"
import { openSuggestion } from "../../shared/helpers/suggestion/model/suggestion-store"
import { useUserStore } from "../../shared/model/user-store"
import { EventsTransport } from "../../features/events/api/events-transport"
import { CalendarHeader } from "../../widgets/calendar/calendar-header/calendar-header"

export const Calendar: React.FC = () => {
  const accessToken = useUserStore((st) => st.accessToken)
  const [isFetched, setFetched] = useState<boolean>(false)
  // Текущий день
  const currentDay = getToday()

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
    const daysCountIndexed = dayjs(`${currentMonth + 1}-01-${currentYear}`).day()
    const daysCount = daysCountIndexed === 0 ? 6 : daysCountIndexed - 1
    return new Array(daysCount).fill(0).map((v, i) => i + 1)
  }, [currentMonth, currentYear])

  // Все события и флаг открыта ли модалка нового события
  const [events, setEvents] = useState<DayEvent[]>([])

  // запрашиваем все события
  useEffect(() => {
    if (!accessToken) {
      return
    }
    new EventsTransport()
      .getEvents()
      .then(setEvents)
      .catch(console.log)
      .finally(() => setFetched(true))
  }, [accessToken])

  useEffect(() => {
    if (events.length === 0 && isFetched) {
      openSuggestion(
        "Создайте новое событие!",
        'Нажмите на значок "+" и выберите необходимые параметры',
      )
    }
  }, [events])

  return (
    <div className={"calendar"}>
      <CalendarHeader
        setEvents={setEvents}
        currentMonth={currentMonth}
        currentYear={currentYear}
        currentDay={currentDay}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />

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
              const thatDay = dayjs(thatDate, "MM-DD-YYYY")?.format("YYYY-MM-DD")
              const eventDay = dayjs(e.date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")
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
