import { UserContext } from "@context/user/UserContext";
import { useContext, useEffect, useState } from "react";
import { Calendar, CalendarEvents } from "nexious-library";
import { IEvent } from "app-calendar";

const UserCalendar = () => {
  const { calendarEvents } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [selectedDay, setSelectedDay] = useState<IEvent | undefined>();

  useEffect(() => {
    // find event day
    const target = calendarEvents.filter((e) => e.date === value)[0];
    setSelectedDay(target);
  }, [value]);

  return (
    <section className="split-container">
      <Calendar value={new Date()} setDay={(val: { date: string }) => setValue(val.date)} events={calendarEvents} />
      <CalendarEvents
        data={{
          header: { title: "Your calendar events", subtitle: value },
        }}
        // event={selectedDay}
        selectedDay={selectedDay}
      />
    </section>
  );
};
export default UserCalendar;
