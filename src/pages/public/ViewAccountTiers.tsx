import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useState } from "react";
import { serviceTiers } from "@data/nexious.json";
import { AccountTier } from "auth-context";
import { Button, Icon, ItemDetail, capFirstCharacter } from "nexious-library";

const ViewAccountTiers = () => {
  const { accountTier, user } = useContext(AuthContext);
  const [active, setActive] = useState<"free" | "basic" | "advanced" | string>("free");

  const subscribeToPlan = (plan: AccountTier) => {
    console.log("plan :>> ", plan);
  };

  return (
    <div className="primary-container">
      <h1 className="heading">View service tiers</h1>
      <div className="btn-card-container">
        {serviceTiers.map((service: AccountTier) => (
          <div key={service.tierId} className="container flex-center">
            <Button
              theme={`service-card highlight${active === service.tier ? " service-card-active" : ""}${
                accountTier?.tier === service.tier ? " btn-active" : ""
              }`}
              onClick={() => setActive(service.tier)}
            >
              <h2 className="heading text-center">{capFirstCharacter(service.tier)}</h2>
              <ItemDetail label="Calendar Events" labelLayout="bolden">
                <span>{service.calendarEvent ? <Icon icon="check" /> : <Icon icon="uncheck" />}</span>
              </ItemDetail>
              <ItemDetail label="Calendar Bookings" labelLayout="bolden">
                <span>{service.calendarBooking ? <Icon icon="check" /> : <Icon icon="uncheck" />}</span>
              </ItemDetail>
              <ItemDetail label="Online payments" labelLayout="bolden">
                <span>{service.storeCheckout ? <Icon icon="check" /> : <Icon icon="uncheck" />}</span>
              </ItemDetail>
              <ItemDetail label="Max apps" labelLayout="bolden">
                <span> {service.maxApps}</span>
              </ItemDetail>
              <ItemDetail label="Max pages per app" labelLayout="bolden">
                <span> {service.maxPagesPerApp}</span>
              </ItemDetail>
              <ItemDetail label="Price" labelLayout="bolden">
                <span> ${service.cost}/Monthly</span>
              </ItemDetail>
            </Button>
            {service.tier === accountTier?.tier && <Button theme="btn-main btn-active" label="Subscribed" />}
            {service.tier === active && active !== accountTier?.tier && (
              <Button theme="btn-main" label="Subscribe to this plan" onClick={() => subscribeToPlan(service)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAccountTiers;
