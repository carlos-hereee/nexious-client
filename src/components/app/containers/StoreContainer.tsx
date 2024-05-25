import { AppContext } from "@context/app/AppContext";
import { SettingsContainer } from "app-types";
import { useContext } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import data from "@data/data.json";
import { ItemDetail, CopyButton, Button } from "nexious-library";

const StoreContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");
  const { store, appLink, stripeOnboarding, appId } = useContext(AppContext);
  // const { store, appLink, redirectUrl } = useContext(AppContext);

  if (!store || !store.storeId) {
    return (
      <div className="container">
        <h2 className="heading">Store:</h2>
        <ItemDetail label="Store details:" labelLayout="bolden">
          <Button label="+ Create store" onClick={() => updatePhase("phase-one")} />
        </ItemDetail>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="heading">Store:</h2>
      <ItemDetail label="Store url:" labelLayout="bolden">
        <CopyButton data={formatStoreUrl(appLink, store.name)} />
      </ItemDetail>

      {store.onBoardingRequired ? (
        <ItemDetail label="Stripe Onboarding:" labelLayout="bolden" hint={data.stripeOnboarding}>
          <Button label="*Onboarding" theme="btn-main btn-required" onClick={() => stripeOnboarding(appId)} />
        </ItemDetail>
      ) : (
        <ItemDetail label="Stripe Settings:" labelLayout="bolden">
          <Button label="View configuration" onClick={() => updatePhase("configuration")} />
        </ItemDetail>
      )}
      <MerchList />
      <ItemDetail label="Add merchendise:" labelLayout="bolden">
        <Button label="+ Add merch" onClick={() => updatePhase("phase-three")} />
      </ItemDetail>
      <ItemDetail label="Store details:" labelLayout="bolden">
        <Button label="Edit store details" onClick={() => updatePhase("phase-two")} />
      </ItemDetail>
      <ItemDetail label="Remove store:" labelLayout="bolden">
        <Button label="Delete store" theme="btn-main btn-danger" onClick={() => updatePhase("confirm-cancel")} />
      </ItemDetail>
    </div>
  );
};
export default StoreContainer;
