import { FormValueProps } from "app-forms";
import { Calendar, IconButton } from "nexious-library";
import { useState } from "react";

type PreviewCalendarProps = {
  events: FormValueProps;
};
type SelectedDayProps = {
  date: string;
  list: any;
};
type MeetingProps = {
  uid: string;
  response: string;
};

const PreviewCalendar: React.FC<PreviewCalendarProps> = (props) => {
  const [selectedDay, setSelectedDay] = useState<SelectedDayProps>();
  const [meeting, setMeeting] = useState<MeetingProps>();
  const [error, setError] = useState("");

  const { events } = props;

  console.log("events :>> ", events);
  const handleDayClick = (e: any) => {
    setError("");
  };
  const findNextOpen = () => setError("Nothing found this month try a different month");
  return (
    <div className="container">
      {events.title && <h2 className="heading">{events.title}</h2>}
      <Calendar
        value={new Date()}
        onDayClick={handleDayClick}
        minDate={new Date()}
        events={events || []}
      />
      <div className="event-wrapper">
        {selectedDay && (
          <h2 className="heading">
            {`${selectedDay.date} ${meeting?.uid ? `@ ${meeting.response}` : ""}`}
          </h2>
        )}
        {selectedDay && selectedDay.list.length > 0 ? (
          selectedDay.list.map((day: any) => (
            <IconButton
              icon={meeting?.uid === day.uid ? "check" : "uncheck"}
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
    </div>
  );
};
export default PreviewCalendar;
