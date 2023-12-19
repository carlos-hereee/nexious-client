import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import CopyToClipboard from "../sections/CopyToClipboard";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const StoreContainer = (props: PageContainerProps) => {
  const { onAddItem, onEditDetails } = props;
  const { store, appLink } = useContext(AppContext);

  if (!store || !store.storeId) {
    return (
      <KeyWithDefinition label="Store details:" labelLayout="bolden">
        {onAddItem && <Button label="+ Create store" onClick={() => onAddItem("phase-one")} />}
      </KeyWithDefinition>
    );
  }

  // console.log("store :>> ", store);
  return (
    <div className="container">
      <h2 className="heading">Store:</h2>
      <KeyWithDefinition label="Store name:" value={store.name} labelLayout="bolden" />
      <KeyWithDefinition label="Store url:" labelLayout="bolden">
        <CopyToClipboard data={formatStoreUrl(appLink, store.name)} />
      </KeyWithDefinition>
      <MerchList />
      <KeyWithDefinition label="More options: " labelLayout="bolden">
        <div className="buttons-container">
          {onEditDetails && (
            <Button label="Edit store details" onClick={() => onEditDetails("phase-one")} />
          )}
          {onAddItem && <Button label="+ Add merch" onClick={() => onAddItem("phase-two")} />}
        </div>
      </KeyWithDefinition>
    </div>
  );
};
export default StoreContainer;
