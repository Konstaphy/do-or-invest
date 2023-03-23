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
  date: string
  is_done: boolean
  is_expired: boolean
  id: string
}

export enum Priotity {
  LOW,
  MEDIUM,
  HIGH,
}
