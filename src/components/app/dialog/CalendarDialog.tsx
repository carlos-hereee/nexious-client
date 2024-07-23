import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import ViewSchedule from "@components/list/ViewSchedule";
import { CalendarContext } from "@context/calendar/CalendarContext";
import CreateCalendar from "../forms/calendar/CreateCalendar";
import EditCalendar from "../forms/calendar/EditCalendar";
import EditBooking from "../forms/calendar/EditBooking";
import AddCalEvent from "../forms/calendar/AddCalEvent";

const CalendarDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { schedule } = useContext(CalendarContext);

  const handleClick = (e) => {
    console.log("e :>> ", e);
  };

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {status === "phase-one" && <CreateCalendar />}
      {status === "phase-two" && <EditCalendar />}
      {status === "phase-three" && <EditBooking />}
      {status === "phase-add-event" && <AddCalEvent />}
      {status === "phase-four" && <ViewSchedule list={schedule} onClick={handleClick} />}
    </Dialog>
  );
};
export default CalendarDialog;
