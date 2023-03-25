import { MonthFromNumber } from "../../../shared/lib/date-utils"
import { Button } from "../../../shared/ui/button/button"
import React, { useState } from "react"
import { Day, DayEvent } from "../../../shared/model/common-types"
import { usePenalty } from "../../../features/auth/lib/use-penalty"
import { AddNewEventModal } from "../../modal/add-new-event-modal/add-new-event-modal"

type CalendarHeaderProps = {
  currentMonth: number
  currentYear: number
  currentDay: Day
  setCurrentMonth: (month: number) => void
  setCurrentYear: (month: number) => void
  setEvents: (events: DayEvent[]) => void
}
export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  currentYear,
  currentDay,
  setCurrentMonth,
  setCurrentYear,
  setEvents,
}) => {
  // конфиг модалки добавления
  const [isModalShown, setModalShown] = useState(false)

  // запрашиваем штраф
  const { penalty } = usePenalty()

  // выбираем следующий месяц
  const getNextMonth = () => {
    // если декабрь, то перемещаемся на январь след года
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // выбираем предыдущий месяц
  const getPrevMonth = () => {
    // если январь, то перемещаемся на декабрь предыдущего года
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  return (
    <div className={"calendar-header"}>
      <AddNewEventModal
        setEvents={setEvents}
        setIsShown={setModalShown}
        isShown={isModalShown}
      />
      <div className={"day-info"}>
        <h3>
          {MonthFromNumber[currentMonth]}, {currentYear}
        </h3>
        <p>
          Сегодня: {currentDay.weekDay}, {currentDay.month},{" "}
          <strong>{currentDay.day} число</strong>
        </p>
        <div>
          Ваш общий штраф = <strong style={{ color: "darkred" }}>{penalty}</strong>
        </div>
      </div>
      <div className={"calendar-month-choosing"}>
        <p onClick={getPrevMonth}>Предыдущий месяц</p>
        <p onClick={getNextMonth}>Следующий месяц</p>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => setModalShown(true)} circle>
          +
        </Button>
      </div>
    </div>
  )
}
