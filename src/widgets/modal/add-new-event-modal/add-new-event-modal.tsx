import React, { useState } from "react"
import "../core/modal.css"
import { Modal, PortalProps } from "../core/modal"
import axios from "axios"
import { DayEvent, Priotity } from "../../../shared/model/common-types"
import { Button } from "../../../shared/ui/button/button"
import { Input } from "../../../shared/ui/input/input"
import {
  openSuccessAlert,
  openErrorAlert,
} from "../../../shared/helpers/alert/model/alert-store"
import { useUserStore } from "../../../shared/model/user-store"

export const AddNewEventModal: React.FC<
  Pick<PortalProps, "setIsShown" | "isShown"> & {
    setEvents: (events: DayEvent[]) => void
  }
> = ({ isShown, setIsShown, setEvents }) => {
  const [title, setTitle] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [priority, setPriority] = useState<Priotity>(Priotity.LOW)
  const { id, accessToken } = useUserStore((user) => ({
    id: user.id,
    accessToken: user.accessToken,
  }))

  const setNewEvent = (title: string | null, day: string | null, time: string | null) => {
    if (!title || !day || !id) {
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
          user_id: id,
          is_done: false,
          priority: priority,
        },
        {
          signal: controller.signal,
          headers: { authorization: `Bearer ${accessToken}` },
        },
      )
      .then((r) => {
        openSuccessAlert("Событие создано успешно")
        setEvents(r.data)
      })
      .catch(() => {
        openErrorAlert("Произошла ошибка при сохранении события")
      })
      .finally(() => setIsShown(false))
  }

  return (
    <Modal
      isShown={isShown}
      setIsShown={setIsShown}
      title={"Добавить новое событие"}
      button={
        <Button onClick={() => setNewEvent(title, day, "16:00:00")}>Добавить</Button>
      }
    >
      <div className={"new-event-form"}>
        <Input type={"text"} value={title || ""} title={"Название"} setValue={setTitle} />
        <Input type={"date"} value={day || ""} title={"День"} setValue={setDay} />
        <select>
          <option onSelect={() => setPriority(Priotity.LOW)}>Низкий</option>
          <option onSelect={() => setPriority(Priotity.MEDIUM)}>Средний</option>
          <option onSelect={() => setPriority(Priotity.HIGH)}>Высокий</option>
        </select>
      </div>
    </Modal>
  )
}
