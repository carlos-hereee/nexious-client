import { CalendarContainerProps } from "app-calendar";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";
import CopyToClipboard from "../sections/CopyToClipboard";

const CalendarContainer = ({ onPhaseClick }: CalendarContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  const { calendar, appUrl } = useContext(AppContext);

  // if no calendar has been created
  if (!calendar || !calendar.calendarId)
    return (
      <div className="container">
        <h2 className="heading">Calendar:</h2>
        <KeyWithDefinition label="Calendar settings: " labelLayout="bolden">
          <Button label="+ Create calendar" onClick={() => onPhaseClick("phase-one")} />
        </KeyWithDefinition>
      </div>
    );
  return (
    <div className="container">
      <h2 className="heading">Calendar</h2>
      <KeyWithDefinition label="Copy calendar link:" labelLayout="bolden">
        <CopyToClipboard data={appUrl.replace("app/", "booking/")} />
      </KeyWithDefinition>
      <KeyWithDefinition label="Calendar settings: " labelLayout="bolden">
        <Button label="Edit calendar details" onClick={() => onPhaseClick("phase-two")} />
      </KeyWithDefinition>
    </div>
  );
};
export default CalendarContainer;
