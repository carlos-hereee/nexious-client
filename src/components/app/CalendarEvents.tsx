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
import { IconButton, ItemDetail, UserCard } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { MeetingDetials } from "app-calendar";

const CalendarEvents = () => {
  const { user } = useContext(AuthContext);
  const { selectedDay, errorMessage, meeting, updateMeeting } = useContext(CalendarContext);

  console.log("meeting :>> ", meeting);
  useEffect(() => {
    if (selectedDay.date) scrollToId("calendar-events");
  }, [selectedDay]);

  // const findNextOpen = (e) => {
  //   // const { error, event } = findNextOpenApp(events);
  //   // if (errorMessage) return setError(errorMessage);
  //   console.log("findNextOpen :>> ", e);
  //   // setMeeting(event);
  // };
  // const setMeeting = (e) => {
  //   console.log("setMeeting :>> ", e);
  // };
  const handleMettingClick = (m: MeetingDetials) => updateMeeting(m);

  return (
    <div className="calendar-events" id="calendar-events">
      <div className="event-wrapper">
        {selectedDay.date && <h1 className="heading">{new Date(selectedDay.date).toISOString().slice(0, 10)}</h1>}
        {selectedDay.list.length > 0 ? (
          selectedDay.list.map(
            (event) =>
              event.isOpen && (
                <IconButton
                  key={event.uid}
                  icon={{ icon: meeting.uid === event.uid ? "check" : "uncheck", label: event.name || "No event name" }}
                  onClick={() => handleMettingClick(event as unknown as MeetingDetials)}
                />
              )
          )
        ) : (
          <div className="primary-container">
            <h3 className="heading text-center">Nothing happening on this day, search a different day</h3>
            {errorMessage ? (
              <p className="error-message">{errorMessage}</p>
            ) : (
              <button className="btn-main" type="button">
                Find next event
              </button>
            )}
          </div>
        )}
      </div>
      <div className="event-wrapper">
        {meeting.uid ? (
          <div className="container">
            <h2 className="heading">Event details</h2>
            <ItemDetail label="Event name:" labelLayout="bolden">
              <span>{meeting.name || "No name"}</span>
            </ItemDetail>
            <ItemDetail label="Event details:" labelLayout="bolden">
              <span>{meeting.details || "No details"}</span>
            </ItemDetail>
            <ItemDetail label="Start time:" labelLayout="bolden">
              <span>{meeting.startTime}</span>
            </ItemDetail>
            <ItemDetail label="End time:" labelLayout="bolden">
              <span>{meeting.endTime}</span>
            </ItemDetail>
            {/* <IconButton
                // click={setMeeting}
                theme="btn-main"
                icon={{ icon: "cancel", label: "Remove meeting" }}
              /> */}
            {user.userId && (
              <div className="container">
                <h2 className="heading">User Information</h2>
                <UserCard user={user} hideHero />
                {/* <button type="button" className="btn-cta" onClick={handleCheckout}>
                  Proceed to checkout
                </button> */}
              </div>
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
