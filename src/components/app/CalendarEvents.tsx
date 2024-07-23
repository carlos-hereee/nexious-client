// import { MeetingDetails } from "@nxs-atoms";
// import { CalendarEventList, IconButton } from "@nxs-molecules";
// import { CardSection, CartRow, IconButton } from "nexious-library";
// import { setActive } from "@context/services/helpers/setActive";
// import { useContext } from "react";
// import { StoreContext } from "@context/store/StoreContext";
// import { CalendarContext } from "@context/calendar/CalendarContext";
// import { findNextOpenApp } from "@utils/app/findNextOpenApp";
// import { AuthContext } from "@context/auth/AuthContext";

import { scrollToId } from "@app/scrollToElement";
import { CalendarContext } from "@context/calendar/CalendarContext";
import { useContext, useEffect } from "react";
import { IconButton, UserCard } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";

const CalendarEvents = () => {
  const { user } = useContext(AuthContext);
  const { selectedDay, errorMessage } = useContext(CalendarContext);
  const meeting = { uid: "", startTime: "Now", endTime: "Later" };

  useEffect(() => {
    if (selectedDay.date) scrollToId("calendar-events");
  }, [selectedDay]);

  const findNextOpen = (e) => {
    // const { error, event } = findNextOpenApp(events);
    // if (errorMessage) return setError(errorMessage);
    console.log("e :>> ", e);
    // setMeeting(event);
  };
  const setMeeting = (e) => {
    console.log("e :>> ", e);
  };
  const handleMettingClick = (e) => {
    console.log("handleMettingClick :>> ", e);
  };

  return (
    <div className="calendar-events" id="calendar-events">
      <div className="event-wrapper">
        {selectedDay.date && <h1 className="heading">{new Date(selectedDay.date).toISOString().slice(0, 10)}</h1>}
        {selectedDay.list.length > 0 ? (
          selectedDay.list.map(
            (day) =>
              day.isOpen && (
                <IconButton
                  key={day.uid}
                  icon={{ icon: meeting.uid === day.uid ? "check" : "uncheck", label: `${day.startTime} - ${day.endTime}` }}
                  onClick={() => handleMettingClick(day)}
                />
              )
          )
        ) : (
          <div className="primary-container">
            <h3 className="heading text-center">Nothing happening on this day, search a different day</h3>
            {errorMessage ? (
              <p className="error-message">{errorMessage}</p>
            ) : (
              <button className="btn-main" type="button" onClick={findNextOpen}>
                Find next event
              </button>
            )}
          </div>
        )}
      </div>
      <div className="event-wrapper">
        {meeting.uid ? (
          <div className="flex-d-column">
            <IconButton
              click={setMeeting}
              icon={{
                icon: "x",
                label: `${meeting.startTime} ${meeting.endTime}`,
              }}
            />
            {user.userId ? (
              <div>
                <h2 className="heading">User Information</h2>
                <UserCard user={user} hideHero />
                {/* <MeetingDetails meeting={meeting} /> */}
                {/* <button type="button" className="btn-cta" onClick={handleCheckout}>
                  Proceed to checkout
                </button> */}
              </div>
            ) : (
              <div>Enter details</div>
            )}
          </div>
        ) : (
          <h2 className="text-center">No meetings </h2>
        )}
      </div>
    </div>
  );
};
export default CalendarEvents;
