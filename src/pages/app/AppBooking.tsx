import { Calendar } from "nexious-library";
import CalendarEvents from "@components/app/CalendarEvents";
import { useContext } from "react";
import UserMenu from "@components/app/UserMenu";
import { CalendarContext } from "@context/calendar/CalendarContext";
// import { IEvent } from "app-calendar";

const AppBooking = () => {
  const { name, events } = useContext(CalendarContext);
  // const { name, events, selectedDay, workWeek } = useContext(CalendarContext);

  // console.log("events :>> ", events);
  // console.log("workWeek :>> ", workWeek);
  // console.log("selectedDay :>> ", selectedDay);
  // const handleDayClick = (e: IEvent) => {
  //   console.log("e :>> ", e);
  // };
  return (
    <section className="primary-container">
      <UserMenu />
      {name && <h1 className="heading">{name}</h1>}
      <Calendar
        value={new Date()}
        // onDayClick={handleDayClick}
        minDate={new Date()}
        // minDetail="month"
        events={events}
      />
      <CalendarEvents />
    </section>
  );
};

export default AppBooking;
