import { UserContext } from "@context/user/UserContext";
import { useContext } from "react";
import { Calendar, CalendarEvents } from "nexious-library";

const UserCalendar = () => {
  const { calendarEvents } = useContext(UserContext);
  console.log("calendarEvents :>> ", calendarEvents);
  return (
    <section className="split-container">
      <Calendar value={new Date()} />
      <CalendarEvents data={{ header: { title: "Your calendar events" } }} events={calendarEvents} />
    </section>
  );
};
export default UserCalendar;
