import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
// import BuildStore from "../forms/BuildStore";

const StoreContainer = (props: PageContainerProps) => {
  // const { data, onRemove, onMediaClick, onAddItem } = props;
  const { data, onAddItem } = props;
  const { store } = useContext(AppContext);

  return (
    <div className="container">
      <h2 className="heading">Store: </h2>
      {store?.storeId ? (
        <>
          {data.heading && <h2 className="heading">{data.heading}</h2>}
          {onAddItem && (
            <div className="flex-center">
              <Button label="+ Add merch" onClick={onAddItem} />
            </div>
          )}
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
