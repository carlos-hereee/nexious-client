import { UserSchema } from "auth-context";
import { Button, Navigation } from "nexious-library";

interface Props<L> {
  list: L[];
  heading?: string;
  navigation?: string[];
  onClick: (data: L) => void;
}
const ViewList = ({ list, heading, onClick, navigation }: Props<UserSchema>) => {
  return (
    <div className="primary-container">
      {heading && <h2 className="heading">{heading}</h2>}
      {navigation && <Navigation menus={navigation} theme="navigation-bar" />}
      {list.map((l, idx) => (
        <Button theme="order-row" key={l.userId} onClick={() => onClick(l)}>
          <span>{idx + 1}</span>
          <span>{new Date(l.createdAt || Date.now()).toISOString().slice(0, 10)}</span>
          <span>{l.accountTier ? l.accountTier.name : "no subscription"}</span>
          <span>{l.username}</span>
          <span>{l.ownedApps?.length || 0}</span>
        </Button>
      ))}
    </div>
  );
};

export default ViewList;
