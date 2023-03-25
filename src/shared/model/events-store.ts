import { create } from "zustand"
import { DayEvent } from "./common-types"

type EventsStore = { events: DayEvent[]; setEvents: (events: DayEvent[]) => void }

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  setEvents: (events: DayEvent[]) => set({ events }),
}))
