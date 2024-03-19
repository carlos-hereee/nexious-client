import { CalendarContainerProps } from "app-calendar";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const CalendarContainer = ({ onPhaseClick }: CalendarContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  return (
    <div className="container">
      <h2 className="heading">Calendar:</h2>
      <KeyWithDefinition label="Calendar settings: " labelLayout="bolden">
        Coming Soon!
      </KeyWithDefinition>
    </div>
  );
};
export default CalendarContainer;
