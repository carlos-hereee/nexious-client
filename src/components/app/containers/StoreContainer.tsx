import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import { Button } from "nexious-library";
import { useContext } from "react";
// import BuildStore from "../forms/BuildStore";

const StoreContainer = (props: PageContainerProps) => {
  // const { data, onRemove, onMediaClick, onAddItem } = props;
  const { data, onAddItem, onClick } = props;
  const { store } = useContext(AppContext);

  // console.log("store :>> ", store);

  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      {store?.storeId ? (
        <>
          {store.name && <p>{store.name}</p>}
          {store.name && <p>{store.name}</p>}
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
