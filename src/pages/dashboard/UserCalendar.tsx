import { UserContext } from "@context/user/UserContext";
import { useContext, useState } from "react";
import { Calendar, CalendarEvents } from "nexious-library";
import { IEvent } from "app-calendar";

const UserCalendar = () => {
  const { calendarEvents } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [event, setEvent] = useState<IEvent | undefined>();

  return (
    <section className="split-container">
      <Calendar
        value={new Date()}
        setDay={(val: { date: string }) => setValue(val.date)}
        events={calendarEvents}
        onDayClick={(day: { list: IEvent[] }) => setEvents(day.list)}
      />
      <CalendarEvents
        data={{
          header: { title: "Your calendar events", subtitle: value },
          events,
        }}
        event={event}
        onEventClick={setEvent}
      />
    </section>
  );
};
export default UserCalendar;
