import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
// import { serviceTiers } from "@data/nexious.json";
import { SubscriptionSchema } from "auth-context";
import { Button, Dialog, Icon, ItemDetail, Loading, Navigation, capFirstCharacter } from "nexious-library";
import { useNavigate } from "react-router-dom";
import EditSubscription from "@components/app/forms/store/EditSubscription";
import { AppContext } from "@context/app/AppContext";

type Menu = "Monthly" | "Yearly";
const ViewAccountTiers = () => {
  const { accountTier, user, accessToken, updateTier, accountTiers, isPlatformOwner } = useContext(AuthContext);
  const { setAppMessage, appMessage } = useContext(AppContext);
  const [active, setActive] = useState<string>("");
  const [activePlan, setActivePlan] = useState<SubscriptionSchema | undefined>();
  const [menu, setMenu] = useState<Menu>("Monthly");
  const [filteredTiers, setFilteredTiers] = useState<SubscriptionSchema[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (appMessage === "SUCCESS") {
      setActivePlan(undefined);
      setAppMessage("");
    }
  }, [appMessage]);
  useEffect(() => {
    if (accountTiers) {
      const filtered = accountTiers.filter((tier) => tier.recurring === menu);
      setFilteredTiers(filtered);
    }
  }, [menu]);
  if (!accountTiers) return <Loading />;
  const subscribeToPlan = (plan: SubscriptionSchema) => {
    if (!accessToken) navigate("/login");
    else updateTier({ ...user, accountTier: plan });
  };

  return (
    <div className="primary-container">
      <h1 className="heading">View service tiers</h1>
      <Navigation menus={["Monthly", "Yearly"]} theme="navigation-bar" active={menu} onClick={(m: Menu) => setMenu(m)} />
      <div className="btn-card-container">
        {filteredTiers && filteredTiers.length > 0 ? (
          filteredTiers.map((service: SubscriptionSchema) => (
            <div key={service.subscriptionId} className="container flex-center ">
              <Button
                theme={`service-card highlight${active === service.subscriptionId ? " service-card-active" : ""}`}
                onClick={() => setActive(service.subscriptionId)}
              >
                <div className="container">
                  <h2 className="heading text-center">{capFirstCharacter(service.name)}</h2>
                  {service.features.map((feature) => (
                    <ItemDetail key={feature.featureId} label={service.name} labelLayout="bolden">
                      <span>
                        {feature.valueType === "Checkbox" &&
                          (feature.value ? <Icon icon="check" /> : <Icon icon="uncheck" />)}
                        {feature.valueType === "Message" && feature.value}
                      </span>
                    </ItemDetail>
                  ))}
                </div>
                <ItemDetail label="Price" labelLayout="bolden">
                  <span>
                    ${service.cost}/{service.recurring}
                  </span>
                </ItemDetail>
              </Button>
              {service.subscriptionId === accountTier?.subscriptionId && (
                <Button theme="btn-main btn-active" label="Subscribed" />
              )}
              {service.subscriptionId === active &&
                active !== accountTier?.subscriptionId &&
                (isPlatformOwner ? (
                  <Button label="Update details" onClick={() => setActivePlan(service)} />
                ) : (
                  <Button label="Subscribe to this plan" onClick={() => subscribeToPlan(service)} />
                ))}
            </div>
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
