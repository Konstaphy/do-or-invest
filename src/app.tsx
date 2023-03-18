import {Calendar} from "./widgets/calendar/calendar";
/**
 * **Что надо сделать для MVP:** <br/>
 * - Календарь, показывающий все события <br/>
 * - Кнопка добавления события <br/>
 * **Событие:**
 * - Время начала
 * - Время конца
 * - Приоритет
 * */
export function App() {
  return (
    <div className="main">
      <Calendar />
    </div>
  )
}
