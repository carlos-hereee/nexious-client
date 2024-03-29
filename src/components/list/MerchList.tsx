import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import { Button, Hero, Spinner } from "nexious-library";
import MerchDialog from "@components/app/dialog/MerchDialog";
import { MerchProps } from "services-context";
import KeyWithDefinition from "@components/app/sections/KeyWithDefinition";
import hint from "@data/data.json";

const MerchList = () => {
  const { store, getStoreInventory, loadingState, inventory } = useContext(AppContext);
  const [show, setShow] = useState({ inventory: false, item: false });
  const [editValues, setEdit] = useState<MerchProps>();

  const onClose = () => setShow({ ...show, item: false });
  const handleClick = (item: MerchProps) => {
    setEdit(item);
    setShow({ ...show, item: true });
  };
  const openInventory = () => {
    getStoreInventory(store.storeId);
    setShow({ ...show, inventory: true });
  };
  if (!store.inventory || store.inventory.length === 0) {
    return (
      <KeyWithDefinition label="Inventory:" labelLayout="bolden" hint={hint.noInventoryHint}>
        <p>No merchendise</p>
      </KeyWithDefinition>
    );
  }
  return (
    <KeyWithDefinition label="Inventory:" labelLayout="bolden" hint={show ? hint.merchShowHint : hint.merchHideHint}>
      {show.inventory ? (
        <div className="container">
          <Button
            label="Close Inventory"
            theme="btn-cancel btn-main highlight btn-close"
            onClick={() => setShow({ ...show, inventory: false })}
          />
          <div className="inventory-container">
            {inventory.map((item) => (
              <button
                type="button"
                key={item.uid}
                className="iventory-item-card highlight"
                onClick={() => handleClick(item)}
              >
                {item.hero && <Hero theme="thumbnail" hero={{ url: item.hero, alt: `product ${item.name}` }} />}
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
      {show.item && editValues && <MerchDialog onClose={onClose} formValues={editValues} />}
    </KeyWithDefinition>
  );
};
export default MerchList;
