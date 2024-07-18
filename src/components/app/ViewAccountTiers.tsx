import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ISubscription } from "auth-context";
import { Dialog, Loading, Navigation } from "nexious-library";
import { useNavigate } from "react-router-dom";
import EditSubscription from "@components/app/forms/store/EditSubscription";
import { AppContext } from "@context/app/AppContext";
import { useNavigationMenus } from "@hooks/useNavigationMenus";
import SubscriptionCard from "./SubscriptionCard";

const ViewAccountTiers = ({ subscriptions, heading }: { subscriptions: ISubscription[]; heading?: string }) => {
  const { user, accessToken, addTier, setUpdateTier } = useContext(AuthContext);
  const { setAppMessage, appMessage } = useContext(AppContext);
  const [active, setActive] = useState<string>("");
  const [activePlan, setActivePlan] = useState<ISubscription | undefined>();
  const { filteredItems, menus, activeMenu, updateActiveMenu } = useNavigationMenus<ISubscription>({
    filterKey: "recurring",
    items: subscriptions,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (appMessage === "SUCCESS") {
      setActivePlan(undefined);
      setAppMessage("");
    }
  }, [appMessage]);

  if (!filteredItems) return <Loading />;

  const subscribeToPlan = (plan: ISubscription) => {
    if (!accessToken) {
      setUpdateTier(plan);
      navigate("/login");
    } else addTier({ user, plan });
  };

  return (
    <div className="primary-container">
      {heading ? <h1 className="heading">{heading}</h1> : <h1 className="heading">View service tiers</h1>}
      <Navigation menus={menus} theme="navigation-bar" active={activeMenu} onClick={updateActiveMenu} />
      <div className="btn-card-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((service: ISubscription) => (
            <SubscriptionCard
              key={service.subscriptionId}
              subscription={service}
              setActive={setActive}
              active={active}
              setActivePlan={setActivePlan}
              subscribeToPlan={subscribeToPlan}
            />
          ))
        ) : (
          <p>None yet come back later</p>
        )}
      </div>
      {activePlan && (
        <Dialog onDialogClose={() => setActivePlan(undefined)}>
          <EditSubscription subscription={activePlan} />
        </Dialog>
      )}
    </div>
  );
};

export default ViewAccountTiers;
