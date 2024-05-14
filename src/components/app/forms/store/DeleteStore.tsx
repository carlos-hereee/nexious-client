import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { Form } from "nexious-library";
import { useContext } from "react";

const DeleteStore = () => {
  const { store, appId } = useContext(AppContext);
  const { deleteStore } = useContext(AdminContext);
  // const [typeConfirm, setConfirm] = useState("");
  // const [error, setError] = useState("");

  // const handleConfirm = () => {
  //   if (typeConfirm === "CONFIRM") {
  //     setError("");
  //     deleteStore(appId);
  //   } else setError("Must enter 'CONFIRM' to delete");
  // };
  // const handleChange = (e: { value: string }[]) => {
  //   const val = e[0].value;
  //   setConfirm(val);
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
        onSubmit={(data) => console.log("data :>> ", data)}
      />
    </div>
  );
};

export default DeleteStore;
