import React, { useState, useRef } from "react"
import { DayEvent } from "../../../shared/model/common-types"
import { Tip } from "../../../shared/ui/tip/tip"

type EventLightProps = {
  event: DayEvent
}

export const EventLight: React.FC<EventLightProps> = ({ event }) => {
  const [isTipShown, setTipShown] = useState<boolean>(false)
  const ref = useRef<HTMLElement>(null)
  return (
    <>
      <Tip isShown={isTipShown} element={ref.current}>
        {event.title}
      </Tip>
      <span
        key={event.id}
        ref={ref}
        onMouseEnter={() => setTipShown(true)}
        onMouseLeave={() => setTipShown(false)}
        className={event.is_expired ? "circle-pseudo red" : "circle-pseudo"}
      ></span>
    </>
  )
}
