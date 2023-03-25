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
  priority?: number
}

export enum Priotity {
  LOW,
  MEDIUM,
  HIGH,
}

export type User = {
  id: number | null
  accessToken: string | null
  username: string | null
  email: string | null
}
