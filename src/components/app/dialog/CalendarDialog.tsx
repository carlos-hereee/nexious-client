import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "nexious-library";
import ViewSchedule from "@components/list/ViewSchedule";
import { CalendarContext } from "@context/calendar/CalendarContext";
import { AppContext } from "@context/app/AppContext";
import { IEvent } from "app-calendar";
import CreateCalendar from "../forms/calendar/CreateCalendar";
import EditCalendar from "../forms/calendar/EditCalendar";
import EditBooking from "../forms/calendar/EditBooking";
import AddCalEvent from "../forms/calendar/AddCalEvent";
import MeetingDetails from "../calendar/MeetingDetails";

const CalendarDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { schedule, events, event, getCalendar, updateActiveEvent, requestStatus, setCalStatus } = useContext(CalendarContext);
  const { appId } = useContext(AppContext);
  const [error, setError] = useState("");

  const handleClose = () => {
    updateActiveEvent({ ...event, date: "" });
    onClose();
  };

  useEffect(() => {
    if (events) {
      const requireEvents = events.some((e) => typeof e === "string");
      if (requireEvents) getCalendar({ appId });
    }
  }, [schedule, events]);
  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      handleClose();
      setCalStatus("");
      setError("");
    }
    if (requestStatus === "ERROR") {
      handleClose();
      setError("Unable to fullfill request");
    }
  }, [requestStatus]);
  const handleClick = (e: IEvent) => updateActiveEvent(e);

  if (event.date) {
    return (
      <Dialog theme={`alt-${theme}`} onDialogClose={handleClose}>
        <MeetingDetails meeting={event} />
      </Dialog>
    );
  }
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {status === "phase-one" && <CreateCalendar />}
      {status === "phase-two" && <EditCalendar />}
      {status === "phase-three" && <EditBooking />}
      {status === "phase-add-event" && <AddCalEvent errorMessage={error} />}
      {status === "phase-four" && <ViewSchedule list={schedule} onClick={handleClick} navigation={["#", "createdAt"]} />}
      {status === "phase-view-event" && (
        <ViewSchedule
          list={events}
          onClick={handleClick}
          navigation={["#", "Created(yyyy/mm/dd)", "Date(yyyy/mm/dd)", "Start time", "End time", "Is active"]}
        />
      )}
    </Dialog>
  );
};
export default CalendarDialog;
