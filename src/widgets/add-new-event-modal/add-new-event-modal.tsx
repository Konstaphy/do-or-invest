import React, { useState, useCallback } from "react"
import "../modal/modal.css"
import { Modal } from "../modal/modal"
import axios from "axios"

type PortalProps = {
  isShown: boolean
  setIsShown: (v: boolean) => void
}

export const AddNewEventModal: React.FC<PortalProps> = ({
  isShown,
  setIsShown,
}) => {
  const [title, setTitle] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)

  const setNewEvent = useCallback(
    (title: string | null, day: string | null) => {
      if (!title || !day) {
        return
      }
      const controller = new AbortController()
      axios
        .post(
          "http://127.0.0.1:5000/event/new",
          {
            title,
            day,
            user_id: "0",
            is_done: false,
          },
          { signal: controller.signal },
        )
        .then((r) => console.log(r.data))

      return () => {
        controller.abort()
      }
    },
    [],
  )

  return (
    <Modal
      isShown={isShown}
      setIsShown={setIsShown}
      title={"Добавить новое событие"}
      button={<button onClick={() => setNewEvent(title, day)}>123</button>}
    >
      <div className={"new-event-form"}>
        <input
          type={"text"}
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type={"date"}
          value={day || ""}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
    </Modal>
  )
}
