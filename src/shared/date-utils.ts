import dayjs from "dayjs"
import { Day } from "./types"

export const MonthFromNumber: Record<number, string> = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь",
}

export const WeekDayFromNumber: Record<number, string> = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
}

export function getToday(): Day {
  const day = dayjs()
  return {
    day: day.date(),
    weekDay: WeekDayFromNumber[day.day()],
    month: MonthFromNumber[day.month()],
    year: day.year(),
    source: day,
  }
}
