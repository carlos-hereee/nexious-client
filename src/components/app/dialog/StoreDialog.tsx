import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import AddStore from "../forms/AddMerch";
import BuildStore from "../forms/BuildStore";

const StoreDialog = (props: DialogProps) => {
  const { onClose, header } = props;
  const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  console.log("store :>> ", store);
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      {/* TODO add preview store */}
      {!store.storeId ? <BuildStore /> : <AddStore />}
      {/* <div className="flex-center">
        <ButtonCancel onClick={onClose} theme="btn-main" />
        <Button label="Confirm" onClick={onConfirm} />
      </div> */}
    </Dialog>
  );
};
export default StoreDialog;
