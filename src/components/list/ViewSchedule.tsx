import { formatDate } from "@app/stringToCamalCase";
import { IEvent } from "app-calendar";
import { Button, Loading, Navigation } from "nexious-library";

interface Props<L> {
  list: L[];
  heading?: string;
  navigation?: string[];
  onClick: (data: L) => void;
}
const ViewSchedule = ({ list, heading, onClick, navigation }: Props<IEvent>) => {
  const requireEvents = list.some((e) => typeof e === "string");
  if (requireEvents) return <Loading />;
  return (
    <div className="primary-container">
      {heading && <h2 className="heading">{heading}</h2>}
      {navigation && <Navigation menus={navigation} theme="navigation-bar hide-on-mobile" />}
      {list.length > 0 ? (
        list.map((l, idx) => (
          <Button theme="order-row overflow-x" key={l.eventId || l.uid} onClick={() => onClick(l)} isDisable={!l.isOpen}>
            <span className="hide-on-mobile">{idx + 1}</span>
            <span className="hide-on-mobile">{formatDate(l.createdAt || "")}</span>
            <span>{formatDate(l.date)}</span>
            <span>{l.name}</span>
            <span>
              {l.startTime} - {l.endTime}
            </span>
            <span className="hide-on-mobile">{l.isOpen ? "active" : "disabled"}</span>
          </Button>
        ))
      ) : (
        <p> No events</p>
      )}
    </div>
  );
};

export default ViewSchedule;
