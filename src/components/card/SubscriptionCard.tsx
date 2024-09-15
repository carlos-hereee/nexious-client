import { AuthContext } from "@context/auth/AuthContext";
import { ISubscription } from "auth-context";
import { Button } from "nexious-library";
import { useContext } from "react";
import SubscriptionCardDetails from "./SubscriptionCardDetails";

interface Props {
  subscription: ISubscription;
  active?: string;
  hideButtons?: boolean;
  setActive?: (id: string) => void;
  setActivePlan?: (plan: ISubscription) => void;
  subscribeToPlan?: (plan: ISubscription) => void;
}

const SubscriptionCard = ({ subscription, active, hideButtons, setActive, setActivePlan, subscribeToPlan }: Props) => {
  const { accountTier, isPlatformOwner } = useContext(AuthContext);

  if (hideButtons) return <SubscriptionCardDetails subscription={subscription} />;
  return (
    <div className="container flex-center">
      <Button
        theme={`service-card highlight${active === subscription.subscriptionId ? " service-card-active" : ""}`}
        onClick={() => setActive && setActive(subscription.subscriptionId)}
      >
        <SubscriptionCardDetails subscription={subscription} />
      </Button>
      {subscription.subscriptionId === accountTier?.subscriptionId && <Button theme="btn-main btn-active" label="Subscribed" />}
      {subscription.subscriptionId === active &&
        active !== accountTier?.subscriptionId &&
        (isPlatformOwner
          ? setActivePlan && <Button label="Update details" onClick={() => setActivePlan(subscription)} />
          : subscribeToPlan && <Button label="Subscribe to this plan" onClick={() => subscribeToPlan(subscription)} />)}
    </div>
  );
};
export default SubscriptionCard;
