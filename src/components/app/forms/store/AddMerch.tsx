import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

const AddMerch = () => {
  const { merchForm, addMerch, isLoading } = useContext(AdminContext);
  const { iconList, appId, appName } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");

  useEffect(() => {
    if (isLoading) setStatus("loading");
  }, [isLoading]);

  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="primary-container">
      <Form
        initialValues={merchForm.initialValues}
        labels={merchForm.labels}
        placeholders={merchForm.placeholders}
        types={merchForm.types}
        dataList={{ icon: iconList }}
        clearSelection={{ icon: true }}
        heading={`Add merchendise: ${appName}`}
        onSubmit={(values: AppValues) => addMerch(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{ required: ["name", "description", "cost", "quantity"] }}
      />
    </div>
  );
};
export default AddMerch;