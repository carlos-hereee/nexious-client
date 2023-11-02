// import { MeetingDetails } from "@nxs-atoms";
// import { CalendarEventList, IconButton } from "@nxs-molecules";
import { CardSection } from "nexious-library";
import { IconButton } from "nexious-library";
// import { setActive } from "../utils/context/services/helpers/setActive";
import { useContext, useState } from "react";
import { ServicesContext } from "../../utils/context/services/ServicesContext";
import { CalendarContext } from "../../utils/context/calendar/CalendarContext";
import { AppContext } from "../../utils/context/app/AppContext";
import { findNextOpenApp } from "../../utils/app/findNextOpenApp";
import { AuthContext } from "../../utils/context/auth/AuthContext";
import { Link } from "react-router-dom";
import { CartRow } from "nexious-library";

const CalendarEvents = () => {
  const { handleCheckout, user } = useContext(AuthContext);
  const { active, services, setActive } = useContext(ServicesContext);
  const { selectedDay, meeting, events, setMeeting, error, setError } = useContext(CalendarContext);

  const findNextOpen = (e) => {
    const { error, event } = findNextOpenApp(events);
    if (error) return setError(error);
    setMeeting(event);
  };

  return (
    <div className="calendar-events">
      <div className="calendar-package-details">
        <h2 className="heading">Selected package</h2>
        {active ? (
          <CardSection data={active} />
        ) : (
          services.map((s) => <CartRow data={s} key={s.uid} click={() => setActive(s)} />)
        )}
      </div>
      <div className="event-wrapper">
        {selectedDay && (
          <h2 className="heading">
            {`${selectedDay.date} ${meeting?.uid ? `@ ${meeting.response}` : ""}`}
          </h2>
        )}
        {selectedDay && selectedDay.list.length > 0 ? (
          selectedDay.list.map((day) => (
            <IconButton
              icon={meeting.uid === day.uid ? "check" : "uncheck"}
              key={day.uid}
              label={`${day.startTime} - ${day.endTime}`}
            />
          ))
        ) : (
          <div className="container">
            <strong>No open meetings this day, try a different day</strong>
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <button className="btn-main" type="button" onClick={findNextOpen}>
                Find next availible
              </button>
            )}
          </div>
        )}
      </div>
      {/* <div className="event-wrapper">
      
        {meeting.uid ? (
          <div className="flex-d-column">
            <IconButton
              click={setMeeting}
              icon={{
                icon: "x",
                label: `${meeting.time.startTime} ${meeting.time.endTime}`,
              }}
            />
            {user && user.uid ? (
              <div>
                <h2 className="heading">User Information</h2>
                <UserCard user={user} hideHero />
                <MeetingDetails meeting={meeting} />
                <button type="button" className="btn-cta" onClick={handleCheckout}>
                  Proceed to checkout
                </button>
              </div>
            ) : (
              <div>Enter details</div>
            )}
          </div>
        ) 

        )}
      </div> */}
    </div>
  );
};
export default CalendarEvents;
