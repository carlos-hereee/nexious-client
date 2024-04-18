import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext, useEffect } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import data from "@data/data.json";
import KeyWithDefinition from "../sections/KeyWithDefinition";
import CopyToClipboard from "../sections/CopyToClipboard";

const StoreContainer = ({ onPhaseClick }: PageContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  const { store, appLink, stripeOnboarding, appId, redirectUrl } = useContext(AppContext);

  useEffect(() => {
    if (redirectUrl) window.location.href = redirectUrl;
  }, [redirectUrl]);

  if (!store || !store.storeId) {
    return (
      <div className="container">
        <h2 className="heading">Store:</h2>
        <KeyWithDefinition label="Store details:" labelLayout="bolden">
          <Button label="+ Create store" onClick={() => onPhaseClick("phase-one")} />
        </KeyWithDefinition>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="heading">Store:</h2>
      <KeyWithDefinition label="Store url:" labelLayout="bolden">
        <CopyToClipboard data={formatStoreUrl(appLink, store.name)} />
      </KeyWithDefinition>
      {store.onBoardingRequired ? (
        <KeyWithDefinition label="Stripe Onboarding:" labelLayout="bolden" hint={data.stripeOnboarding}>
          <Button label="*Onboarding" theme="btn-main btn-required" onClick={() => stripeOnboarding(appId)} />
        </KeyWithDefinition>
      ) : (
        <KeyWithDefinition label="Stripe Settings:" labelLayout="bolden">
          <Button label="View configuration" onClick={() => onPhaseClick("configuration")} />
        </KeyWithDefinition>
      )}
      {!store.inventory || store.inventory.length === 0 ? (
        <KeyWithDefinition label="Inventory:" labelLayout="bolden" hint={data.noInventoryHint}>
          <Button label="+ Add merch" onClick={() => onPhaseClick("phase-two")} />
        </KeyWithDefinition>
      ) : (
        <MerchList />
      )}
      <KeyWithDefinition label="More options: " labelLayout="bolden">
        {/* <Button label="Edit store details" onClick={() => onPhaseClick("phase-one")} /> */}
        <div className="flex-g">
          <Button label="Edit store details" onClick={() => onPhaseClick("phase-one")} />
          <Button label="+ Add merch" onClick={() => onPhaseClick("phase-two")} />
        </div>
      </KeyWithDefinition>
    </div>
  );
};
export default StoreContainer;
