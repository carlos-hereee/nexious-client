import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Button, ItemDetail, Loading } from "nexious-library";
import { hints } from "@data/nexious.json";

const UpdateStripeConfig = () => {
  const { store, stripeConfig, getStripeAccountLink, appId } = useContext(AppContext);
  // const { getAccount, updateAccount, stripeForm } = useContext(AdminContext);
  const { getAccount } = useContext(AdminContext);

  useEffect(() => {
    // TODO: avoid closing dialog
    if (!stripeConfig && store.accountId) getAccount(appId);
  }, []);

  if (!store) return <Loading />;
  // console.log("store :>> ", store);
  // console.log("store :>> ", store);
  // console.log("stripeConfig :>> ", stripeConfig);

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
            <ItemDetail label="View stripe configuration:" labelLayout="bolden" hint={hints.stripeOnboarding}>
              <Button label="View configuration" onClick={() => getStripeAccountLink(appId)} />
            </ItemDetail>
          )}
          <ItemDetail label="Email:" labelLayout="bolden">
            {store.email}
          </ItemDetail>
          <ItemDetail label="Currency:" labelLayout="bolden">
            {store.currency}
          </ItemDetail>
        </div>
      </div>
      <div />
    </div>
  );
};
export default UpdateStripeConfig;
