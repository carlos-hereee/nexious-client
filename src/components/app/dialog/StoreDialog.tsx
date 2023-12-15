import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import AddMerch from "../forms/AddMerch";
import BuildStore from "../forms/BuildStore";

const StoreDialog = (props: DialogProps) => {
  const { onClose, header } = props;
  const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  console.log("store :>> ", store);
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      {/* TODO add preview store */}
      {store?.storeId ? <AddMerch /> : <BuildStore />}
    </Dialog>
  );
};
export default StoreDialog;
