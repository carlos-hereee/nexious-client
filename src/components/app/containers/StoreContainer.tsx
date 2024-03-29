// import { AppContext } from "@context/app/AppContext";
import { PageContainerProps } from "app-types";
import KeyWithDefinition from "../sections/KeyWithDefinition";
// import { Button } from "nexious-library";
// import { useContext } from "react";
// import { formatStoreUrl } from "@app/formatStringUrl";
// import MerchList from "@components/list/MerchList";
// import data from "@data/data.json";
// import CopyToClipboard from "../sections/CopyToClipboard";
// import KeyWithDefinition from "../sections/KeyWithDefinition";

const StoreContainer = ({ onPhaseClick }: PageContainerProps) => {
  // require key variable
  if (!onPhaseClick) throw Error("onPhaseClick is required");
  // const { store, appLink } = useContext(AppContext);
  return (
    <div>
      <h2 className="heading">Store:</h2>
      <KeyWithDefinition label="Store details:" labelLayout="bolden">
        <p>Coming Soon!</p>
      </KeyWithDefinition>
    </div>
  );
  // if (!store || !store.storeId) {
  //   return (
  //     <div className="container">
  //       <h2 className="heading">Store:</h2>
  //       <KeyWithDefinition label="Store details:" labelLayout="bolden">
  //         <Button label="+ Create store" onClick={() => onPhaseClick("phase-one")} />
  //       </KeyWithDefinition>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="container">
  //     <h2 className="heading">Store:</h2>
  //     <KeyWithDefinition label="Store url:" labelLayout="bolden">
  //       <CopyToClipboard data={formatStoreUrl(appLink, store.name)} />
  //     </KeyWithDefinition>
  //     <KeyWithDefinition label="Stripe Settings:" labelLayout="bolden">
  //       <Button label="View configuration" onClick={() => onPhaseClick("configuration")} />
  //     </KeyWithDefinition>
  //     {!store.inventory || store.inventory.length === 0 ? (
  //       <KeyWithDefinition label="Inventory:" labelLayout="bolden" hint={data.noInventoryHint}>
  //         <Button label="+ Add merch" onClick={() => onPhaseClick("phase-two")} />
  //       </KeyWithDefinition>
  //     ) : (
  //       <MerchList />
  //     )}
  //     <KeyWithDefinition label="More options: " labelLayout="bolden">
  //       <div className="flex-g">
  //         <Button label="Edit store details" onClick={() => onPhaseClick("phase-one")} />
  //         <Button label="+ Add merch" onClick={() => onPhaseClick("phase-two")} />
  //       </div>
  //     </KeyWithDefinition>
  //   </div>
  // );
};
export default StoreContainer;
