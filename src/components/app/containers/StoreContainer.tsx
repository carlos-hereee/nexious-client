import { AppContext } from "@context/app/AppContext";
import { SettingsContainer } from "app-types";
import { useContext, useEffect } from "react";
import MerchList from "@components/list/MerchList";
import { hints } from "@data/nexious.json";
import { ItemDetail, CopyButton, Button } from "nexious-library";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import { AuthContext } from "@context/auth/AuthContext";
import { formatStoreUrl } from "@app/formatStringUrl";
import AppLimitations from "../AppLimitations";
import InitPhase from "../InitPhase";

const StoreContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  const { store, appLink, inventory, getStoreInventory, signUpWithStripe, appId } = useContext(AppContext);
  const { isPlatformOwner } = useContext(AuthContext);
  const { limitations } = useAccountLimitations();

  useEffect(() => {
    // avoid redundant request if num of merch dont match get store inventory
    if (store.inventory.length !== inventory.length) getStoreInventory(store.storeId);
    // rerender request per store id
  }, [store.storeId]);

  // account limitations
  if (!isPlatformOwner && !limitations.onlineStore) return <AppLimitations heading="Upgrade your account to access your store" />;
  // create store
  if (!store || !store.storeId) return <InitPhase name="Store" onClick={() => updatePhase("phase-one")} />;

  return (
    <div className="container">
      <h2 className="heading">Store:</h2>
      <ItemDetail label="Store url:" labelLayout="bolden">
        <CopyButton data={formatStoreUrl(appLink, store.name)} />
      </ItemDetail>
      <ItemDetail label="Orders:" labelLayout="bolden">
        <Button
          label="View orders"
          onClick={() => updatePhase("phase-view-order")}
          ping={store.orders?.filter((o) => o.status !== "completed").length || undefined}
        />
      </ItemDetail>
      {store.accountId ? (
        <ItemDetail label="Stripe Settings:" labelLayout="bolden" hint={hints.stripeConfiguration}>
          <Button label="View configuration" onClick={() => updatePhase("configuration")} />
        </ItemDetail>
      ) : (
        <ItemDetail label="Link stripe account:" labelLayout="bolden" hint={hints.stripeConfiguration}>
          <Button label="Sign up with stripe" onClick={() => signUpWithStripe(appId)} />
        </ItemDetail>
      )}
      <MerchList updateStatus={() => updatePhase("configuration")} />
      <ItemDetail label="Add merchendise:" labelLayout="bolden">
        <Button label="+ Add merch" onClick={() => updatePhase("phase-three")} />
      </ItemDetail>
      <ItemDetail label="Store details:" labelLayout="bolden">
        <Button label="Edit store details" onClick={() => updatePhase("phase-two")} />
      </ItemDetail>
      <ItemDetail label="Remove store:" labelLayout="bolden">
        <Button label="Delete store" theme="btn-main btn-required" onClick={() => updatePhase("confirm-cancel")} />
      </ItemDetail>
    </div>
  );
};
export default StoreContainer;
