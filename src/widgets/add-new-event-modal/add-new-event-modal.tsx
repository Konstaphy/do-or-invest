import React from "react"
import "../modal/modal.css"
import { Modal } from "../modal/modal"

type PortalProps = {
  isShown: boolean
  setIsShown: (v: boolean) => void
}

export const AddNewEventModal: React.FC<PortalProps> = ({
  isShown,
  setIsShown,
}) => {
  return (
    <Modal isShown={isShown} setIsShown={setIsShown}>
      <>{21}</>
    </Modal>
  )
}
