import { CalendarContainerProps } from "app-calendar";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const CalendarContainer = ({ onPhaseClick }: CalendarContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  const { calendar } = useContext(AppContext);
  console.log("calendar :>> ", calendar);
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
      <KeyWithDefinition label="Calendar settings: " labelLayout="bolden">
        <Button label="+ Edit calendar details" onClick={() => onPhaseClick("phase-two")} />
      </KeyWithDefinition>
      {/* <KeyWithDefinition label="Calendar settings: " labelLayout="bolden">
        <Button label="+ Edit calendar details" onClick={() => onPhaseClick("phase-two")} />
      </KeyWithDefinition> */}
    </div>
  );
};
export default CalendarContainer;
