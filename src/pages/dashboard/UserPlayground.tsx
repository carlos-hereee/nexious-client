import { useContext, useEffect, useState } from "react";
import { UserCard, Navigation } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import TrackOrder from "@components/app/containers/TrackOrders";
import { StoreContext } from "@context/store/StoreContext";
// import { MediaContext } from "@context/media/MediaContext";
import { dashboardNav } from "@data/navigation.json";
import AccountSettings from "./AccountSettings";
import AppPlayground from "./AppPlayground";

type Menu = "apps" | "account" | "orders";

const UserPlayground = () => {
  const [active, setActive] = useState<Menu>("apps");
  const { user, tierUpdate, setUpdateTier, updateTier } = useContext(AuthContext);
  const { welcomeMessage } = useContext(AppContext);
  const { trackOrder } = useContext(StoreContext);
  // const { getPosts } = useContext(MediaContext);

  // useEffect(() => {
  //   getPosts("");
  // }, []);

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
      <UserCard user={{ hero: user.avatar, alt: `${user.nickname || "user"} avatar` }} hideLabels theme="user-banner" />
      <h3 className="heading text-center">
        {welcomeMessage} {user.nickname ? user.nickname : user.username}
      </h3>
      <Navigation
        menus={dashboardNav}
        theme="navigation-container"
        onClick={(m: Menu) => setActive(m)}
        active={active}
        navItemTheme="btn-main"
        activeTheme="btn-main btn-active"
      />

      {/* <button type="button" onClick={() => listBucket(appId)}>
        List bucket
      </button> */}

      {active === "apps" && <AppPlayground />}
      {active === "orders" && <TrackOrder />}
      {active === "account" && <AccountSettings />}
    </section>
  );
};
export default UserPlayground;
