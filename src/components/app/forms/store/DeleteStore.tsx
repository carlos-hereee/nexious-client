import ConfirmRemovals from "@components/app/containers/ConfirmRemoval";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";

const DeleteStore = () => {
  const { store, appId } = useContext(AppContext);
  const { deleteStore } = useContext(AdminContext);

  const handleConfirm = () => deleteStore(appId);

  return <ConfirmRemovals name={store.name} onConfirm={handleConfirm} />;
};

export default DeleteStore;
