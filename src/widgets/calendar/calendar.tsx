import React, { useMemo } from "react"
import { getToday } from "../../shared/date-utils"
import { Day } from "./day"
import "./calendar.css"
import dayjs from "dayjs"

export const Calendar: React.FC = () => {
  // Текущий день
  const currentDay = useMemo(() => {
    return getToday()
  }, [])

  // Массив всех дней в текущем месяце
  const dayArray = useMemo(() => {
    const time = currentDay.source.daysInMonth()
    return new Array(time).fill(0).map((v, i) => i + 1)
  }, [])

  const firstWeekButPastMonthDays = useMemo(() => {
    const daysCount = dayjs().add(-currentDay.day, "d").day()
    return new Array(daysCount).fill(0).map((v, i) => i + 1)
  }, [])

  console.log(firstWeekButPastMonthDays)

  return (
    <div className={"calendar"}>
      <p>{currentDay.month}</p>
      <p>Сегодня: {currentDay.weekDay}</p>
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
