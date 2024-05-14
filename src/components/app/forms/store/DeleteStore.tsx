import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { Form } from "nexious-library";
import { useContext } from "react";

const DeleteStore = () => {
  const { store, appId } = useContext(AppContext);
  const { deleteStore } = useContext(AdminContext);

  const handleConfirm = (data: { confirm: string }) => {
    // redundant delete
    if (data.confirm === "CONFIRM") deleteStore(appId);
  };

  return (
    <div className="container text-center">
      <h2 className="heading w-max text-center">Are you sure you want to delete your store {store?.storeName}</h2>
      <p className="w-max">This will delete all progress</p>
      {/* {error && <p className="required w-max">{error}</p>} */}
      <Form
        theme="form-center"
        initialValues={{ confirm: "" }}
        labels={{ confirm: "Type CONFIRM to delete" }}
        schema={{ required: ["confirm"], match: [{ name: "confirm", value: "CONFIRM" }] }}
        onSubmit={(data: { confirm: string }) => handleConfirm(data)}
      />
    </div>
  );
};

export default DeleteStore;
