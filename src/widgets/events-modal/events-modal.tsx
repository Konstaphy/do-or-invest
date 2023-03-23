import React from "react"
import { PortalProps, Modal } from "../modal/modal"
import { DayEvent } from "../../shared/model/common-types"

export const EventsModal: React.FC<
  Pick<PortalProps, "isShown" | "setIsShown"> & { events: DayEvent[] }
> = ({ isShown, setIsShown, events }) => {
  if (events.length === 0) {
    return null
  }
  return (
    <Modal isShown={isShown} setIsShown={setIsShown} title={"События"}>
      <div>
        {events.map((ev) => (
          <p>{ev.title}</p>
        ))}
      </div>
    </Modal>
  )
}
