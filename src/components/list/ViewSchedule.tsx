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
      {navigation && <Navigation menus={navigation} theme="navigation-bar" />}
      {list.length > 0 ? (
        list.map((l, idx) => (
          <Button theme="order-row" key={l.eventId || l.uid} onClick={() => onClick(l)} isDisable={!l.isOpen}>
            <span>{idx + 1}</span>
            <span>{new Date(l.createdAt || Date.now()).toISOString().slice(0, 10)}</span>
            <span>{new Date(l.date).toISOString().slice(0, 10)}</span>
            <span>{l.name}</span>
            <span>{l.startTime}</span>
            <span>{l.endTime}</span>
            <span>{l.isOpen ? "active" : "disabled"}</span>
          </Button>
        ))
      ) : (
        <p>No events</p>
      )}
    </div>
  );
};

export default ViewSchedule;
