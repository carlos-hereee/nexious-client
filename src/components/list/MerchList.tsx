import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import { Button, Hero } from "nexious-library";
import HintButton from "@components/app/buttons/HintButton";
import MerchDialog from "@components/app/dialog/MerchDialog";
import { MerchProps } from "services-context";

// const MerchList = (props: { handleHint: () => void }) => {
const MerchList = () => {
  const { store } = useContext(AppContext);
  const { inventory } = store;
  const [show, setShow] = useState({ inventory: false, item: false });
  const [editValues, setEdit] = useState<MerchProps>();

  const hintData = {
    title: "Hint!",
    body: show
      ? "Click on inventory items to edit details"
      : "Click on show inventory to view inventory. Then you can click on inventory items and edit them. ",
  };
  const noInventoryHint = {
    title: "Hint!",
    body: "Your inventory is empty click on + add merch to add items to your inventory",
  };

  const onClose = () => setShow({ ...show, item: false });
  const handleClick = (item: MerchProps) => {
    setEdit(item);
    setShow({ ...show, item: true });
  };
  if (!inventory || inventory.length === 0) {
    return (
      <div className="key-with-definition">
        <HintButton data={noInventoryHint} />
        <p>No merchendise</p>
      </div>
    );
  }
  return (
    <div className="key-with-definition">
      <HintButton data={hintData} />
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
                {item.hero && (
                  <Hero theme="thumbnail" hero={{ url: item.hero, alt: `product ${item.name}` }} />
                )}
                <p>{item.name} </p>
                {item.quantity > 0 ? <p>{item.quantity} Remaining</p> : <p>OUT OF STOCK</p>}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Button label="Show inventory" onClick={() => setShow({ ...show, inventory: true })} />
      )}
      {show.item && editValues && <MerchDialog onClose={onClose} formValues={editValues} />}
    </div>
  );
};
export default MerchList;
