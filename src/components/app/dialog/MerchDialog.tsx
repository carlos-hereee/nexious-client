import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
// import AddMerch from "../store/AddMerch";
// import BuildStore from "../store/BuildStore";
// import EditStore from "../store/EditStore";
import { MerchProps } from "services-context";
import EditMerch from "../store/EditMerch";

const MerchDialog = (props: DialogProps) => {
  const { onClose, formValues } = props;
  // const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {formValues && <EditMerch initValues={formValues as MerchProps} />}
    </Dialog>
  );
};
export default MerchDialog;
