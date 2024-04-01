import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import CreateCalendar from "../forms/CreateCalendar";
import EditCalendar from "../forms/EditCalendar";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const CalendarDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}
      <KeyWithDefinition label="Calendar theme: ">Comming Soon!</KeyWithDefinition>
      <KeyWithDefinition label="Calendar booking: ">Comming Soon!</KeyWithDefinition>
      {status === "phase-one" && <CreateCalendar />}
      {status === "phase-two" && <EditCalendar />}
    </Dialog>
  );
};
export default CalendarDialog;
