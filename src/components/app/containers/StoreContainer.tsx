import { AppContext } from "@context/app/AppContext";
import { SettingsContainer } from "app-types";
import { useContext, useEffect } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import { hints } from "@data/nexious.json";
import { ItemDetail, CopyButton, Button } from "nexious-library";

const StoreContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");
  const { store, appLink, inventory, getStoreInventory } = useContext(AppContext);
  useEffect(() => {
    // avoid redundant request if num of merch dont match get store inventory
    if (store.inventory.length !== inventory.length) getStoreInventory(store.storeId);
    // rerender request per store id
  }, [store.storeId]);
  // if (!store || !store.storeId) {
  //   return (
  //     <div className="container">
  //       <h2 className="heading">Store:</h2>
  //       <ItemDetail label="Store details:" labelLayout="bolden">
  //         <Button label="+ Create store" onClick={() => updatePhase("phase-one")} />
  //       </ItemDetail>
  //     </div>
  //   );
  // }

  return (
    <div className="container">
      <h2 className="heading">Store:</h2>
      <ItemDetail label="Store url:" labelLayout="bolden">
        <CopyButton data={formatStoreUrl(appLink, store.name)} />
      </ItemDetail>
      <ItemDetail label="Pending orders:" labelLayout="bolden">
        <Button
          label="View orders"
          onClick={() => updatePhase("phase-view-order-pending")}
          ping={store.pendingOrders?.length}
        />
      </ItemDetail>
      <ItemDetail label="Incomplete orders:" labelLayout="bolden">
        <Button
          label="View incomplete orders"
          onClick={() => updatePhase("phase-view-order-incomplete")}
          ping={store.inCompleteOrders?.length}
        />
      </ItemDetail>
      <ItemDetail label="Complete orders:" labelLayout="bolden">
        <Button
          label="View completed orders"
          onClick={() => updatePhase("phase-view-order-complete")}
          ping={store.completedOrders?.length}
        />
      </ItemDetail>
      <ItemDetail label="Stripe Settings:" labelLayout="bolden" hint={hints.stripeConfiguration}>
        <Button label="View configuration" onClick={() => updatePhase("configuration")} />
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
