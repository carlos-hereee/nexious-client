import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
// import { serviceTiers } from "@data/nexious.json";
import { ISubscription } from "auth-context";
import { Button, Dialog, Icon, ItemDetail, Loading, Navigation, capFirstCharacter } from "nexious-library";
import { useNavigate } from "react-router-dom";
import EditSubscription from "@components/app/forms/store/EditSubscription";
import { AppContext } from "@context/app/AppContext";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";
import { useNavigationMenus } from "@hooks/useNavigationMenus";

const ViewAccountTiers = ({ subscriptions, heading }: { subscriptions: ISubscription[]; heading?: string }) => {
  const { accountTier, user, accessToken, addTier, isPlatformOwner, setUpdateTier } = useContext(AuthContext);
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
            <div key={service.subscriptionId} className="container flex-center ">
              <Button
                theme={`service-card highlight${active === service.subscriptionId ? " service-card-active" : ""}`}
                onClick={() => setActive(service.subscriptionId)}
              >
                <div className="container">
                  <h2 className="heading text-center">{capFirstCharacter(service.name)}</h2>
                  <div className="text-left">
                    <ItemDetail label="Subscription details" labelLayout="bolden">
                      <span className="text-center">{service.description}</span>
                    </ItemDetail>
                    {service.features.map((feature) => (
                      <ItemDetail key={feature.featureId} label={feature.name} labelLayout="bolden">
                        <span className="text-center">
                          {feature.valueType === "Checkbox" &&
                            (feature.value ? <Icon icon="check" /> : <Icon icon="uncheck" />)}
                          {feature.valueType === "Message" && feature.value}
                        </span>
                      </ItemDetail>
                    ))}
                  </div>
                </div>
                <ItemDetail label="Price" labelLayout="bolden">
                  <span>
                    ${formatPenniesToDollars(service.cost)}/{service.recurring}
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
