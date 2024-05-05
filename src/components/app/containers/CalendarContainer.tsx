import { CalendarContainerProps } from "app-calendar";
import { Button } from "nexious-library/@nxs-atoms";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, CopyButton } from "nexious-library";

const CalendarContainer = ({ onPhaseClick }: CalendarContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  const { calendar, appUrl } = useContext(AppContext);

  // if no calendar has been created
  if (!calendar || !calendar.calendarId)
    return (
      <div className="container">
        <h2 className="heading">Calendar:</h2>
        <ItemDetail label="Calendar settings: " labelLayout="bolden">
          <Button label="+ Create calendar" onClick={() => onPhaseClick("phase-one")} />
        </ItemDetail>
      </div>
    );
  return (
    <div className="container">
      <h2 className="heading">Calendar</h2>
      <ItemDetail label="Copy calendar link:" labelLayout="bolden">
        <CopyButton data={appUrl.replace("app/", "booking/")} />
      </ItemDetail>
      <ItemDetail label="Calendar settings: " labelLayout="bolden">
        <Button label="Edit calendar details" onClick={() => onPhaseClick("phase-two")} />
      </ItemDetail>
      <ItemDetail label="Calendar booking:" labelLayout="bolden">
        <Button label="Edit calendar booking" onClick={() => onPhaseClick("phase-three")} />
      </ItemDetail>
    </div>
  );
};
export default CalendarContainer;
