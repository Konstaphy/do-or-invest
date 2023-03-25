import { Transport } from "../../../shared/model/transport"
import { DayEvent } from "../../../shared/model/common-types"

export class EventsTransport extends Transport {
  constructor() {
    super("/events")
  }

  public getEvents() {
    return this.get<DayEvent[]>("/")
  }

  public addNewEvent(event: DayEvent) {
    return this.post<{}, DayEvent[]>("", {
      title: event.title,
      date: event.date,
      time: "12:00:00",
      priority: event.priority,
    })
  }
}
