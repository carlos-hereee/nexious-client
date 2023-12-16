import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import MerchList from "@components/list/MerchList";
import CopyToClipboard from "../sections/CopyToClipboard";

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
  const copyLink = formatStoreUrl(appLink, store.name);

  // console.log("store :>> ", store);
  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      <div className="key-with-definition">
        <p>
          <strong>Store name:</strong>
        </p>
        <p>{store.name}</p>
      </div>
      <CopyToClipboard
        data={copyLink}
        label="Copy store url:"
        labelLayout="bolden"
        theme="key-with-definition"
      />
      <MerchList />
      <div className="buttons-container">
        <Button label="Edit store details" onClick={onClick} />
        {onAddItem && <Button label="+ Add merch" onClick={() => onAddItem("phase-two")} />}
      </div>
    </div>
  );
};
export default StoreContainer;
