import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import MerchDialog from "@components/app/dialog/MerchDialog";
import { MerchProps } from "store-context";
import { ItemDetail, Hero, Button, Spinner } from "nexious-library";
import { hints } from "@data/nexious.json";
import { DialogStatusProps } from "app-types";

const MerchList = ({ updateStatus }: { updateStatus?: (key: DialogStatusProps) => void }) => {
  const { store, getStoreInventory, loadingState, inventory } = useContext(AppContext);
  const [show, setShow] = useState({ inventory: false, item: false });
  const [editValues, setEdit] = useState<MerchProps>();

  const onClose = () => {
    setShow({ ...show, item: false });
  };
  const handleClick = (item: MerchProps) => {
    setEdit(item);
    setShow({ ...show, item: true });
  };
  const openInventory = () => {
    // avoid redundant request
    if (inventory.length <= 0) getStoreInventory(store.storeId);
    setShow({ ...show, inventory: true });
  };
  // console.log("inventory :>> ", inventory);
  if (!store.inventory || store.inventory.length === 0) {
    return (
      <ItemDetail label="Inventory:" labelLayout="bolden" hint={hints.noInventoryHint}>
        <strong>Inventory empty</strong>
      </ItemDetail>
    );
  }

  return (
    <ItemDetail label="Inventory:" labelLayout="bolden" hint={show ? hints.merchShowHint : hints.merchHideHint}>
      {show.inventory ? (
        <div className="container">
          <Button
            label="Close Inventory"
            theme="btn-cancel btn-main highlight btn-close"
            onClick={() => setShow({ ...show, inventory: false })}
          />
          <div className="inventory-container">
            {inventory.map((item) => (
              <button type="button" key={item.uid} className="iventory-item-card highlight" onClick={() => handleClick(item)}>
                {(item.thumbnail || item.hero) && (
                  <Hero theme="thumbnail" hero={{ url: item.thumbnail || item.hero, alt: `product ${item.name}` }} />
                )}
                <p>{item.name} </p>
                {item.inStock > 0 ? <p>{item.inStock} Remaining</p> : <p>OUT OF STOCK</p>}
              </button>
            ))}
          </div>
        </div>
      ) : loadingState.isLoadingInventory ? (
        <Spinner />
      ) : (
        <Button label="Show inventory" onClick={openInventory} />
      )}
      {show.item && editValues && <MerchDialog onClose={onClose} merch={editValues} updateStatus={updateStatus} />}
    </ItemDetail>
  );
};
export default MerchList;
