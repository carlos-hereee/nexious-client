import { AppContext } from "@context/app/AppContext";
import { SettingsContainer } from "app-types";
import { useContext, useEffect } from "react";
import MerchList from "@components/list/MerchList";
import { hints } from "@data/nexious.json";
import { ItemDetail, CopyButton, Button } from "nexious-library";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import { AuthContext } from "@context/auth/AuthContext";
import { formatStoreUrl } from "@app/formatStringUrl";
import SettingsCard from "@components/card/SettingsCard";
import AppLimitations from "../AppLimitations";
import ViewOrdersContainer from "./ViewOrdersContainer";

const StoreContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  const { store, appLink, inventory, getStoreInventory, signUpWithStripe, appId } = useContext(AppContext);
  const { isPlatformOwner } = useContext(AuthContext);
  const { limitations } = useAccountLimitations();

  useEffect(() => {
    // avoid redundant request if num of merch dont match get store inventory
    if (store.inventory.length !== inventory.length) getStoreInventory(store.storeId);
    // rerender request per store id097235
  }, [store.storeId]);

  // account limitations
  if (!isPlatformOwner && !limitations.onlineStore) return <AppLimitations heading="Upgrade your account to access your store" />;
  // create store
  if (!store || !store.storeId) return <SettingsCard title="Store" onAddClick={() => updatePhase("phase-one")} active="Store" />;

  return (
    <div className="container">
      <SettingsCard
        title="Store"
        active="Store"
        onAddClick={() => updatePhase("phase-three")}
        onEditClick={() => updatePhase("phase-two")}
        // onRemoveClick={() => updatePhase("confirm-cancel")}
        labels={{ onAddClick: "Add merchandise", onRemoveClick: "Delete Store", onEditClick: "Edit store details" }}
      >
        <ItemDetail label="Store url:" labelLayout="bolden">
          <CopyButton data={formatStoreUrl(appLink, store.name)} />
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
      </SettingsCard>
      <SettingsCard title="Orders">
        <ViewOrdersContainer orders={store.orders ? store.orders : []} />
      </SettingsCard>
    </div>
  );
};
export default StoreContainer;
