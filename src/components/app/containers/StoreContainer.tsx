import { AppContext } from "@context/app/AppContext";
import { SettingsContainer } from "app-types";
import { useContext, useEffect } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import { hints } from "@data/nexious.json";
import { ItemDetail, CopyButton, Button } from "nexious-library";
import { useNotifications } from "@hooks/useNotifications";

const StoreContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  const { store, appLink, inventory, getStoreInventory } = useContext(AppContext);

  const { ping } = useNotifications();

  useEffect(() => {
    // avoid redundant request if num of merch dont match get store inventory
    if (store.inventory.length !== inventory.length) getStoreInventory(store.storeId);
    // rerender request per store id
  }, [store.storeId]);
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
      <ItemDetail label="Orders:" labelLayout="bolden">
        <Button label="View orders" onClick={() => updatePhase("phase-view-order")} ping={ping.orders || undefined} />
      </ItemDetail>
      <ItemDetail label="Stripe Settings:" labelLayout="bolden" hint={hints.stripeConfiguration}>
        <Button label="View configuration" onClick={() => updatePhase("configuration")} />
      </ItemDetail>
      <ItemDetail label="Balance:" labelLayout="bolden">
        <Button label="View balance" onClick={() => updatePhase("phase-view-balance")} />
      </ItemDetail>
      <MerchList updateStatus={() => updatePhase("configuration")} />
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
