import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import CreateCalendar from "../forms/CreateCalendar";
import EditCalendar from "../forms/EditCalendar";
import KeyWithDefinition from "../sections/KeyWithDefinition";
import EditBooking from "../forms/EditBooking";

const CalendarDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}

      {status === "phase-one" && (
        <>
          <KeyWithDefinition label="Calendar theme: ">Comming Soon!</KeyWithDefinition>
          <CreateCalendar />
        </>
      )}
      {status === "phase-two" && (
        <>
          <KeyWithDefinition label="Calendar theme: ">Comming Soon!</KeyWithDefinition>
          <EditCalendar />
        </>
      )}
      {status === "phase-three" && <EditBooking />}
    </Dialog>
  );
};
export default CalendarDialog;
