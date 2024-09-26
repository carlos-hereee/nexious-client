import { formatPenniesToDollars } from "@app/formatPenniesToDollars";
import { ISubscription } from "auth-context";
import { capFirstCharacter, Icon, ItemDetail } from "nexious-library";

const SubscriptionCardDetails = ({ subscription }: { subscription: ISubscription }) => {
  return (
    <>
      <div className="text-left w-max">
        <h2 className="heading text-center">{capFirstCharacter(subscription.name)}</h2>
        <p>{subscription.description}</p>
        {subscription.features.map((feature) => (
          <ItemDetail key={feature.featureId} label={feature.name} labelLayout="bolden">
            <span className="text-center">
              {feature.valueType === "Checkbox" && (feature.value ? <Icon icon="check" /> : <Icon icon="uncheck" />)}
              {feature.valueType === "Message" && feature.value}
            </span>
          </ItemDetail>
        ))}
      </div>
      <div className="w-max text-left">
        <ItemDetail label="Price" labelLayout="bolden">
          <span className="text-center">
            ${formatPenniesToDollars(subscription.cost)}/{subscription.recurring}
          </span>
        </ItemDetail>
        <small>Unsubscribe at any time</small>
      </div>
    </>
  );
};
export default SubscriptionCardDetails;
