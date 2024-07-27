import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext, useEffect } from "react";
import { Button, Dialog, Loading } from "nexious-library";
// import AddMerch from "../store/AddMerch";
// import BuildStore from "../store/BuildStore";
// import EditStore from "../store/EditStore";
import { MerchProps } from "store-context";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import EditMerch from "../forms/store/EditMerch";

const MerchDialog = ({ onClose, merch, updateStatus }: DialogProps) => {
  const { store, appId } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const { editMerch, formStatus, setFormStatus } = useContext(AdminContext);
  useEffect(() => {
    // close form windows on form success
    if (formStatus === "SUCCESS") {
      onClose();
      setFormStatus("IDLE");
    }
  }, [formStatus]);
  // const [active, setActive] = useState("Edit");
  // console.log("formFvalues :>> ", merch);
  // console.log("store :>> ", store);
  if (!merch) return <Loading />;
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      <div className="container">
        <h2 className="heading">Update merchandise</h2>

        {!merch.productId ? (
          <div className="primary-container">
            <p className="text-max text-center required">
              <strong>**This merchandise is not registered for online payments**</strong>
            </p>
            {store.accountId && store.isStripeActive ? (
              <Button onClick={() => editMerch({ values: merch, appId, merchId: merch.merchId })}>Configure now</Button>
            ) : (
              <Button onClick={() => updateStatus && updateStatus("configuration")}>
                Complete stripe configuration to receive online payments
              </Button>
            )}
          </div>
        ) : (
          !merch.priceId && (
            <p className="text-max text-center required">
              <strong>**This merchandise is missing a price data for online payments**</strong>
            </p>
          )
        )}
        <EditMerch initValues={merch as MerchProps} />
      </div>
    </Dialog>
  );
};
export default MerchDialog;
