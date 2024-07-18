import { AuthContext } from "@context/auth/AuthContext";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";
import { ISubscription } from "auth-context";
import { Button, capFirstCharacter, Icon, ItemDetail } from "nexious-library";
import { useContext } from "react";

interface Props {
  subscription: ISubscription;
  active?: string;
  hideButtons?: boolean;
  setActive?: (id: string) => void;
  setActivePlan?: (plan: ISubscription) => void;
  subscribeToPlan?: (plan: ISubscription) => void;
}
const CardDetails = ({ subscription }: { subscription: ISubscription }) => {
  return (
    <>
      <h2 className="heading text-center">{capFirstCharacter(subscription.name)}</h2>
      <div className="text-left w-max">
        <ItemDetail label="Subscription details" labelLayout="bolden">
          <span className="text-center">{subscription.description}</span>
        </ItemDetail>
        {subscription.features.map((feature) => (
          <ItemDetail key={feature.featureId} label={feature.name} labelLayout="bolden">
            <span className="text-center">
              {feature.valueType === "Checkbox" && (feature.value ? <Icon icon="check" /> : <Icon icon="uncheck" />)}
              {feature.valueType === "Message" && feature.value}
            </span>
          </ItemDetail>
        ))}
        <ItemDetail label="Price" labelLayout="bolden">
          <span className="text-center">
            ${formatPenniesToDollars(subscription.cost)}/{subscription.recurring}
          </span>
        </ItemDetail>
      </div>
    </>
  );
};
const SubscriptionCard = ({ subscription, active, hideButtons, setActive, setActivePlan, subscribeToPlan }: Props) => {
  const { accountTier, isPlatformOwner } = useContext(AuthContext);

  if (hideButtons) return <CardDetails subscription={subscription} />;
  return (
    <div className="container flex-center">
      <Button
        theme={`service-card highlight${active === subscription.subscriptionId ? " service-card-active" : ""}`}
        onClick={() => setActive && setActive(subscription.subscriptionId)}
      >
        <CardDetails subscription={subscription} />
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
