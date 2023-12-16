import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import CopyToClipboard from "../sections/CopyToClipboard";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const StoreContainer = (props: PageContainerProps) => {
  const { data, onAddItem, onClick } = props;
  const { store, appLink } = useContext(AppContext);

  if (!store || !store.storeId) {
    return (
      <>
        <p>No store added</p>
        {onAddItem && (
          <div className="flex-center">
            <Button label="+ Create store" onClick={() => onAddItem("phase-one")} />
          </div>
        )}
      </>
    );
  }

  // console.log("store :>> ", store);
  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      <KeyWithDefinition label="Store name:" value={store.name} labelLayout="bolden" />
      <KeyWithDefinition label="Store url:" labelLayout="bolden">
        <CopyToClipboard data={formatStoreUrl(appLink, store.name)} />
      </KeyWithDefinition>
      <MerchList />
      <div className="buttons-container">
        <Button label="Edit store details" onClick={onClick} />
        {onAddItem && <Button label="+ Add merch" onClick={() => onAddItem("phase-two")} />}
      </div>
    </div>
  );
};
export default StoreContainer;
