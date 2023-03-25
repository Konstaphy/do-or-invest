import React from "react"
import { PortalProps, Modal } from "../../../shared/ui/modal/modal"
import { DayEvent } from "../../../shared/model/common-types"
import { Cell } from "../../../shared/ui/offset/cell"
import "./event.css"
import { EventsTransport } from "../../../features/events/api/events-transport"

export const EventsModal: React.FC<
  Pick<PortalProps, "isShown" | "setIsShown"> & { events: DayEvent[] }
> = ({ isShown, setIsShown, events }) => {
  const eventsTransport = new EventsTransport()

  if (events.length === 0) {
    return null
  }
  return (
    <Modal isShown={isShown} setIsShown={setIsShown} title={"События"}>
      <div className={"event__modal"}>
        {events.map((ev) => (
          <Cell
            key={ev.id}
            offsetHorizontal={"m"}
            offsetVertical={"l"}
            onClick={() => {
              eventsTransport.checkAsDone(ev.id).then()
            }}
          >
            <div className="event">
              <p style={{ textTransform: "capitalize" }}>{ev.title}</p>
              <p>{ev.is_done ? "Выполнено" : "Не завершено"}</p>
              <p>{ev.priority}</p>
            </div>
          </Cell>
        ))}
      </div>
    </Modal>
  )
}
