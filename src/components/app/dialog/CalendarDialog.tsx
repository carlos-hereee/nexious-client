import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import ViewSchedule from "@components/list/ViewSchedule";
import { CalendarContext } from "@context/calendar/CalendarContext";
import CreateCalendar from "../forms/CreateCalendar";
import EditCalendar from "../forms/EditCalendar";
import EditBooking from "../forms/EditBooking";

const CalendarDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { schedule, events } = useContext(CalendarContext);

  const handleClick = (e) => {
    console.log("e :>> ", e);
  };
  console.log("schedule :>> ", schedule);
  console.log("events :>> ", events);
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {status === "phase-one" && <CreateCalendar />}
      {status === "phase-two" && <EditCalendar />}
      {status === "phase-three" && <EditBooking />}
      {status === "phase-four" && <ViewSchedule list={schedule} onClick={handleClick} />}
    </Dialog>
  );
};
export default CalendarDialog;
