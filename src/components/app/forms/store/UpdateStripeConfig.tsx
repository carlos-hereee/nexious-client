import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Button, ItemDetail, Loading, uniqueId } from "nexious-library";
import { hints } from "@data/nexious.json";
import { StoreContext } from "@context/store/StoreContext";
import { currencySymbols } from "@data/data.json";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";

const UpdateStripeConfig = () => {
  const { store, getStripeAccountLink, appId } = useContext(AppContext);
  const { getAccount, stripeConfig, getBalance, stripeBalance } = useContext(StoreContext);

  useEffect(() => {
    if (!stripeConfig && store.accountId) getAccount(appId);
    if (!stripeBalance) getBalance(appId);
  }, [stripeConfig]);

  if (!store || !stripeConfig || !stripeBalance) return <Loading />;
  // console.log("store :>> ", store);
  // console.log("store :>> ", store);

  return (
    <div className="primary-container">
      <h2 className="heading">Stripe configuration: {store.storeName}</h2>
      <div className="g-center">
        <div />
        <div className="container">
          {store.onBoardingRequired ? (
            <ItemDetail label="Stripe Onboarding:" labelLayout="bolden" hint={hints.stripeOnboarding}>
              <Button label="*Onboarding" theme="btn-main btn-required" onClick={() => getStripeAccountLink(appId)} />
            </ItemDetail>
          ) : (
            <ItemDetail label="View stripe configuration:" labelLayout="bolden" hint={hints.stripeConfiguration}>
              <Button label="View configuration" onClick={() => getStripeAccountLink(appId)} />
            </ItemDetail>
          )}
          <ItemDetail label="Online payments:" labelLayout="bolden">
            {stripeConfig?.charges_enabled ? <p>Active</p> : <p>Disabled</p>}
          </ItemDetail>
          <ItemDetail label="Email:" labelLayout="bolden">
            {store.email}
          </ItemDetail>
          <ItemDetail label="Currency:" labelLayout="bolden">
            {store.currency}
          </ItemDetail>
          <ItemDetail label="Payout delays:" labelLayout="bolden">
            {stripeConfig.settings?.payouts.schedule.delay_days} days
          </ItemDetail>
          <ItemDetail label="Payout schedule:" labelLayout="bolden">
            {stripeConfig.settings?.payouts.schedule.interval}
          </ItemDetail>{" "}
          <ItemDetail label="Available balance:" labelLayout="bolden" hints={hints.stripeBalance}>
            {stripeBalance.available?.map((a) => (
              <p key={uniqueId()}>
                {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
                {a.amount}
              </p>
            ))}
          </ItemDetail>
          <ItemDetail label="Pending balance:" labelLayout="bolden">
            {stripeBalance.pending?.map((a) => (
              <p key={uniqueId()}>
                {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
                {formatPenniesToDollars(a.amount)}
              </p>
            ))}
          </ItemDetail>
        </div>
      </div>
      <div />
    </div>
  );
};
export default UpdateStripeConfig;
