import { CalendarContainerProps } from "app-calendar";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, CopyButton, Button } from "nexious-library";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import AppLimitations from "../AppLimitations";

const CalendarContainer = ({ onPhaseClick }: CalendarContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  const { calendar, appUrl } = useContext(AppContext);
  const { limitations } = useAccountLimitations();

  if (!limitations.calendarEvents) {
    return <AppLimitations heading="Upgrade your account to access calendar events" />;
  }
  // if no calendar has been created
  if (!calendar || !calendar.calendarId) {
    return (
      <div className="container">
        <h2 className="heading">Calendar:</h2>
        <ItemDetail label="Calendar settings: " labelLayout="bolden">
          <Button label="+ Create calendar" onClick={() => onPhaseClick("phase-one")} />
        </ItemDetail>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="heading">Calendar</h2>
      <ItemDetail label="Copy calendar link:" labelLayout="bolden">
        <CopyButton data={appUrl.replace("app/", "booking/")} />
      </ItemDetail>
      <ItemDetail label="Calendar theme:" labelLayout="bolden">
        Coming Soon!
      </ItemDetail>

      <ItemDetail label="Schedule:" labelLayout="bolden">
        {/* <Button label="View schedule" onClick={() => onPhaseClick("phase-four")} /> */}
        Coming Soon!
      </ItemDetail>
      <ItemDetail label="Bookings:" labelLayout="bolden">
        {/* <Button label="View booking" onClick={() => onPhaseClick("phase-three")} /> */}
        Coming Soon!
      </ItemDetail>
      <ItemDetail label="Add event:" labelLayout="bolden">
        Coming Soon!
      </ItemDetail>
      <ItemDetail label="Calendar settings: " labelLayout="bolden">
        <Button label="Edit calendar details" onClick={() => onPhaseClick("phase-two")} />
      </ItemDetail>
    </div>
  );
};
export default CalendarContainer;
