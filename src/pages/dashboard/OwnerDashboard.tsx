import AddSubscription from "@components/app/forms/store/AddSubscription";
import { AppContext } from "@context/app/AppContext";
import ViewAccountTiers from "@components/app/ViewAccountTiers";
import { Button, Dialog, ItemDetail } from "nexious-library";
import { useContext, useEffect, useState } from "react";
import ViewAccounts from "@components/app/ViewList";
import { UserSchema } from "auth-context";

type Menu = "create-sub" | "view-sub" | "" | "edit-sub" | "view-users";
const OwnerDashboard = () => {
  const { appMessage, setAppMessage, platformTiers, getAppUsers, appUsers } = useContext(AppContext);
  const [active, setActive] = useState<Menu>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (appMessage === "SUCCESS") {
      setShow(false);
      setActive("");
      setAppMessage("");
    }
  }, [appMessage]);
  useEffect(() => {
    if (active === "view-users") {
      if (appUsers.length === 0) getAppUsers("platform");
    }
  }, [active]);
  const handleClick = (value: Menu) => {
    setShow(!!value);
    setActive(value);
  };
  const handleUserClick = (user: UserSchema) => {
    console.log("user :>> ", user);
    // setShow(!!user);
    // setActive(user);
  };

  return (
    <div className="app-container">
      <div className="header-menu">
        <h2 className="heading">ADMIN DASHBOARD</h2>
      </div>
      <div>
        <ItemDetail label="Platform subscriptions:" labelLayout="bolden">
          <Button label="View subscriptions" onClick={() => handleClick("view-sub")} />
        </ItemDetail>
        <ItemDetail label="Add subcriptions:" labelLayout="bolden">
          <Button label="Create subscription" onClick={() => handleClick("create-sub")} />
        </ItemDetail>
        <ItemDetail label="Platform users:" labelLayout="bolden">
          <Button label="View users" onClick={() => handleClick("view-users")} />
        </ItemDetail>
      </div>
      {show && (
        <Dialog onDialogClose={() => handleClick("")}>
          {active === "create-sub" && <AddSubscription />}
          {active === "view-sub" && <ViewAccountTiers subscriptions={platformTiers} />}
          {active === "view-users" && (
            <ViewAccounts
              list={appUsers}
              heading="View users"
              onClick={handleUserClick}
              navigation={["#", "created at", "username", "number of apps"]}
            />
          )}
        </Dialog>
      )}
    </div>
  );
};
export default OwnerDashboard;
