// import { useContext } from "react";
// import { useContext, useEffect } from "react";
// import { CalendarContext } from "@context/calendar/CalendarContext";
// import { StoreContext } from "@context/store/StoreContext";
// import { useNavigate } from "react-router-dom";
import { Calendar } from "nexious-library";
// import { AuthContext } from "@context/auth/AuthContext";
import CalendarEvents from "@components/app/CalendarEvents";
import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import UserMenu from "@components/app/UserMenu";
// import { AppContext } from "@context/app/AppContext";

const AppBooking = () => {
  // const { selectedDay, meeting, setMeeting, setDay } = useContext(CalendarContext);
  // const { bookable, removeFromCart, cart, active, setActive, addToCart } = useContext(StoreContext);
  const { calendar } = useContext(AppContext);
  // const { user } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!active?.uid) {
  //     navigate("/services");
  //   }
  // }, []);

  // const onCheckout = () => {
  //   addToCart(cart, { service: active, meeting, user });
  //   navigate("/checkout");
  // };
  // const handleDayClick = (e) => {
  //   meeting?.uid !== e.uid && setMeeting({});
  //   setDay(e);
  // };
  return (
    <section className="primary-container">
      <UserMenu />
      {calendar.name && <h1 className="heading">{calendar.name}</h1>}
      <Calendar
        value={new Date()}
        // onDayClick={handleDayClick}
        minDate={new Date()}
        // minDetail="month"
        // events={calendar.events ? calendar.events : []}
      />
      <CalendarEvents />
    </section>
  );
};

export default AppBooking;
