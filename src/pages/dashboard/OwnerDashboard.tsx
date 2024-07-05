import AddSubscription from "@components/app/forms/store/AddSubscription";
import { AppContext } from "@context/app/AppContext";
import ViewAccountTiers from "@pages/public/ViewAccountTiers";
import { Button, Dialog, ItemDetail } from "nexious-library";
import { useContext, useEffect, useState } from "react";

type Menu = "create-sub" | "view-sub" | "" | "edit-sub";
const OwnerDashboard = () => {
  const { appMessage, setAppMessage, platformTiers } = useContext(AppContext);
  const [active, setActive] = useState<Menu>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (appMessage === "SUCCESS") {
      setShow(false);
      setActive("");
      setAppMessage("");
    }
  }, [appMessage]);
  const handleClick = (value: Menu) => {
    setShow(!!value);
    setActive(value);
  };

  return (
    <div className="app-container">
      <div className="header-menu">
        <h2 className="heading">ADMIN DASHBOARD</h2>
      </div>
      <div>
        <ItemDetail label="Current subscriptions:" labelLayout="bolden">
          <Button label="View subscriptions" onClick={() => handleClick("view-sub")} />
        </ItemDetail>
        <ItemDetail label="Add subcriptions:" labelLayout="bolden">
          <Button label="Create subscription" onClick={() => handleClick("create-sub")} />
        </ItemDetail>
      </div>
      {show && (
        <Dialog onDialogClose={() => handleClick("")}>
          {active === "create-sub" && <AddSubscription />}
          {active === "view-sub" && <ViewAccountTiers subscriptions={platformTiers} />}
        </Dialog>
      )}
    </div>
  );
};
export default OwnerDashboard;
