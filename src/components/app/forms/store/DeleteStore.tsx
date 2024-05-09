import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { DialogProps } from "app-types";
import { ButtonCancel, Button } from "nexious-library/@nxs-atoms";
import { Form } from "nexious-library";
import { useContext, useState } from "react";

const DeleteStore = ({ onClose }: DialogProps) => {
  const { store, appId } = useContext(AppContext);
  const { deleteStore } = useContext(AdminContext);
  const [typeConfirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (typeConfirm === "CONFIRM") {
      setError("");
      deleteStore(appId);
    } else setError("Must enter 'CONFIRM' to delete");
  };
  const handleChange = (e: { value: string }[]) => {
    const val = e[0].value;
    setConfirm(val);
  };
  return (
    <div className="container text-center">
      <h2 className="heading w-max text-center">Are you sure you want to delete your store {store?.storeName}</h2>
      <p className="w-max">This will delete all progress</p>
      {error && <p className="required w-max">{error}</p>}
      <Form
        theme="form-center"
        initialValues={{ typeConfirm }}
        onChange={handleChange}
        labels={{ typeConfirm: "Type CONFIRM to delete" }}
      />
      <div className="flex-center">
        <Button label="Go back" onClick={onClose} />
        <ButtonCancel onClick={handleConfirm} theme="btn-main" label="Confirm" />
      </div>
    </div>
  );
};

export default DeleteStore;
