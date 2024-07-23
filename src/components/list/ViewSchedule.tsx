import { IEvent } from "app-calendar";
import { Button, Navigation } from "nexious-library";

interface Props<L> {
  list: L[];
  heading?: string;
  navigation?: string[];
  onClick: (data: L) => void;
}
const ViewSchedule = ({ list, heading, onClick, navigation }: Props<IEvent>) => {
  return (
    <div className="primary-container">
      {heading && <h2 className="heading">{heading}</h2>}
      {navigation && <Navigation menus={navigation} theme="navigation-bar" />}
      {list.length > 0 ? (
        list.map((l, idx) => (
          <Button theme="order-row" key={l.uid} onClick={() => onClick(l)}>
            <span>{idx + 1}</span>
            <span>{new Date(l.createdAt || Date.now()).toISOString().slice(0, 10)}</span>
          </Button>
        ))
      ) : (
        <p>No events</p>
      )}
    </div>
  );
};

export default ViewSchedule;
