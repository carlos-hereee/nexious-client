import { useContext, useEffect } from "react";
import { CalendarContext } from "@context/calendar/CalendarContext";
import { ServicesContext } from "@context/services/ServicesContext";
import { useNavigate } from "react-router-dom";
import { Calendar } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import CalendarEvents from "@components/app/CalendarEvents";
import { AppContext } from "@context/app/AppContext";

const Booking = () => {
  const { selectedDay, meeting, setMeeting, setDay } = useContext(CalendarContext);
  const { bookable, removeFromCart, cart, active, setActive, addToCart } =
    useContext(ServicesContext);
  const { calendar } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!active?.uid) {
      navigate("/services");
    }
  }, []);

  const onCheckout = () => {
    addToCart(cart, { service: active, meeting, user });
    navigate("/checkout");
  };
  const handleDayClick = (e) => {
    meeting?.uid !== e.uid && setMeeting({});
    setDay(e);
  };
  return (
    <section className="primary-container">
      <Calendar
        value={new Date()}
        onDayClick={handleDayClick}
        minDate={new Date()}
        // minDetail="month"
        events={calendar.events ? calendar.events : []}
      />
      <CalendarEvents />
    </section>
  );
};

export default Booking;
