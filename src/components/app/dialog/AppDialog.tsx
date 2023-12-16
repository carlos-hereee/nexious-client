import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { useFormStatusChecker } from "@hooks/useFormStatusChecker";
import EditAppDetails from "../forms/EditAppDetails";
// import AddMerch from "../store/AddMerch";
// import BuildStore from "../store/BuildStore";
// import EditStore from "../store/EditStore";

const AppDialog = (props: DialogProps) => {
  const { onClose, header } = props;
  // const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);

  // close dialog on success
  useFormStatusChecker(onClose);

  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      {/* TODO add preview store */}
      <EditAppDetails onCancelClick={onClose} />
    </Dialog>
  );
};
export default AppDialog;
