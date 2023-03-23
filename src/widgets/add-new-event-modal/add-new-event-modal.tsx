import React, { useState } from "react"
import "../modal/modal.css"
import { Modal } from "../modal/modal"
import axios from "axios"
import { DayEvent } from "../../shared/model/common-types"
import { Button } from "../../shared/ui/button/button"
import { Input } from "../../shared/ui/input/input"

type PortalProps = {
  isShown: boolean
  setIsShown: (v: boolean) => void
  setEvents: (v: DayEvent[]) => void
}

export const AddNewEventModal: React.FC<PortalProps> = ({
  isShown,
  setIsShown,
  setEvents,
}) => {
  const [title, setTitle] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)

  const setNewEvent = (
    title: string | null,
    day: string | null,
    time: string | null,
  ) => {
    if (!title || !day) {
      return
    }
    const controller = new AbortController()
    axios
      .post(
        "http://localhost:8080/events/new",
        {
          title: title,
          date: day,
          time: time,
          user_id: "0",
          is_done: false,
        },
        { signal: controller.signal },
      )
      .then((r) => setEvents(r.data))
      .finally(() => setIsShown(false))
  }

  return (
    <Modal
      isShown={isShown}
      setIsShown={setIsShown}
      title={"Добавить новое событие"}
      button={
        <Button onClick={() => setNewEvent(title, day, "16:00:00")}>
          Добавить
        </Button>
      }
    >
      <div className={"new-event-form"}>
        <Input
          type={"text"}
          value={title || ""}
          title={"Название"}
          setValue={setTitle}
        />
        <Input
          type={"date"}
          value={day || ""}
          title={"День"}
          setValue={setDay}
        />
      </div>
    </Modal>
  )
}
