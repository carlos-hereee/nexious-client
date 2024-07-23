import { Calendar, Loading } from "nexious-library";
import CalendarEvents from "@components/app/CalendarEvents";
import { useContext, useEffect } from "react";
import UserMenu from "@components/app/UserMenu";
import { CalendarContext } from "@context/calendar/CalendarContext";
import { AppContext } from "@context/app/AppContext";
import { CalendarDayProp, CalEvent } from "app-calendar";
// import { IEvent } from "app-calendar";

const AppBooking = () => {
  const { name, events, getCalendar, updateSelectedDay } = useContext(CalendarContext);
  const { appId } = useContext(AppContext);
  const requireEvents = events.some((e) => typeof e === "string");

  useEffect(() => {
    if (events) {
      if (requireEvents) getCalendar({ appId });
    }
  }, [events]);

  const handleDayClick = (e: CalEvent | CalendarDayProp) => {
    if ((e as CalEvent).list) updateSelectedDay(e as CalEvent);
    else updateSelectedDay({ date: e.date, list: [] });
  };
  if (requireEvents || !events) return <Loading />;
  return (
    <section className="primary-container">
      <UserMenu />
      {name && <h1 className="heading">{name}</h1>}
      <Calendar
        value={new Date()}
        onDayClick={handleDayClick}
        minDate={new Date()}
        // minDetail="month"
        events={events}
      />
      <CalendarEvents />
    </section>
  );
};

export default AppBooking;
