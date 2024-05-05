import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { DialogProps } from "app-types";
import { ButtonCancel, Button } from "nexious-library/@nxs-atoms";
import { useContext } from "react";

const DeleteStore = ({ onClose }: DialogProps) => {
  const { store, appId } = useContext(AppContext);
  const { deleteStore } = useContext(AdminContext);
  return (
    <div className="container">
      <h2 className="heading">Are you sure you want to delete your store {store?.storeName}</h2>
      <p>This will delete all progress</p>
      <div className="flex-center">
        <Button label="Go back" onClick={onClose} />
        <ButtonCancel onClick={() => deleteStore(appId)} theme="btn-main" label="Confirm" />
      </div>
    </div>
  );
};

export default DeleteStore;
