import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog, ItemDetail } from "nexious-library";
import CreateCalendar from "../forms/CreateCalendar";
import EditCalendar from "../forms/EditCalendar";
import EditBooking from "../forms/EditBooking";

const CalendarDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}

      {status === "phase-one" && (
        <>
          <ItemDetail label="Calendar theme: ">Comming Soon!</ItemDetail>
          <CreateCalendar />
        </>
      )}
      {status === "phase-two" && (
        <>
          <ItemDetail label="Calendar theme: ">Comming Soon!</ItemDetail>
          <EditCalendar />
        </>
      )}
      {status === "phase-three" && <EditBooking />}
    </Dialog>
  );
};
export default CalendarDialog;
