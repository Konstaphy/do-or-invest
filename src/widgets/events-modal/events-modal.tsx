import React from "react"
import { PortalProps, Modal } from "../modal/modal"
import { DayEvent } from "../../shared/model/common-types"
import { Offset } from "../../shared/ui/offset/offset"

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
          <Offset offsetHorizontal={"m"} offsetVertical={"s"}>
            <p>{ev.title}</p>
          </Offset>
        ))}
      </div>
    </Modal>
  )
}
