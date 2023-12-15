import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
import { formatStoreUrl } from "@app/formatStringUrl";
import CopyToClipboard from "../sections/CopyToClipboard";

const StoreContainer = (props: PageContainerProps) => {
  const { data, onAddItem, onClick } = props;
  const { store, appLink } = useContext(AppContext);

  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      {store?.storeId ? (
        <>
          {store.name && (
            <>
              <p>
                <strong>Store name:</strong> {store.name}
              </p>
              <CopyToClipboard
                data={formatStoreUrl(appLink, store.name)}
                label="Copy store url: "
              />
            </>
          )}
          {/* {store.name && <p>{store.name}</p>} */}
          <div className="buttons-container">
            <Button label="Edit store details" onClick={onClick} />
            {onAddItem && <Button label="+ Add merch" onClick={onAddItem} />}
          </div>
        </>
      ) : (
        <>
          <p>No store added</p>
          <div className="flex-center">
            <Button label="+ Create store" onClick={onAddItem} />
          </div>
        </>
      )}
    </div>
  );
};
export default StoreContainer;
