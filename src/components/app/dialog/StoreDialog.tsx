import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import AddStore from "../forms/AddStore";

const StoreDialog = (props: DialogProps) => {
  const { onClose, header } = props;
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      <AddStore />
      {/* <div className="flex-center">
        <ButtonCancel onClick={onClose} theme="btn-main" />
        <Button label="Confirm" onClick={onConfirm} />
      </div> */}
    </Dialog>
  );
};
export default StoreDialog;
