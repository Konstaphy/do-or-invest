// День в читаемом формате
import { Dayjs } from "dayjs"

export type Day = {
  day: number
  month: string
  year: number
  weekDay: string
  source: Dayjs
}

export type DayEvent = {
  title: string
  day: string
  id: string
}
