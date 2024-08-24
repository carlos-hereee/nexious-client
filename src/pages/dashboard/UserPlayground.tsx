import { useContext, useEffect, useState } from "react";
import { IconButton, Banner } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import TrackOrder from "@components/app/containers/TrackOrders";
import { StoreContext } from "@context/store/StoreContext";
import { MediaContext } from "@context/media/MediaContext";
import AccountSettings from "./AccountSettings";
import AppPlayground from "../settings/AppPlayground";

type Menu = "apps" | "account" | "orders";

const UserPlayground = () => {
  const [active, setActive] = useState<Menu>("apps");
  const { user, tierUpdate, setUpdateTier, updateTier } = useContext(AuthContext);
  const { welcomeMessage } = useContext(AppContext);
  const { trackOrder } = useContext(StoreContext);
  const { getPosts } = useContext(MediaContext);

  useEffect(() => {
    getPosts("");
  }, []);

  useEffect(() => {
    // handle account update for new users
    if (tierUpdate) {
      updateTier({ user, plan: tierUpdate });
      setUpdateTier(undefined);
    }
  }, [tierUpdate]);
  useEffect(() => {
    if (trackOrder) setActive("orders");
  }, []);

  return (
    <section className="container">
      <Banner message={`${welcomeMessage} ${user.nickname ? user.nickname : user.username}`} />
      {/* <button type="button" onClick={() => listBucket(appId)}>
        List bucket
      </button> */}
      <nav className="navigation-container">
        <IconButton
          icon={{ icon: "app", label: "Apps" }}
          theme={active === "apps" ? "btn-main btn-active" : "btn-main"}
          onClick={() => setActive("apps")}
        />
        <IconButton
          icon={{ icon: "shopping", label: "Orders" }}
          theme={active === "orders" ? "btn-main btn-active" : "btn-main"}
          onClick={() => setActive("orders")}
        />
        <IconButton
          icon={{ icon: "account", label: "Account" }}
          theme={active === "account" ? "btn-main btn-active" : "btn-main"}
          onClick={() => setActive("account")}
        />
      </nav>

      {active === "apps" && <AppPlayground />}
      {active === "orders" && <TrackOrder />}
      {active === "account" && <AccountSettings />}
    </section>
  );
};
export default UserPlayground;
