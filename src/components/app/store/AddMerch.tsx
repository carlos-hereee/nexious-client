import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const AddMerch = () => {
  const { merchForm, addMerch, sectionEntries, isLoading } = useContext(AdminContext);
  const { iconList, appId, appName } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) setStatus("loading");
  }, [isLoading]);

  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="flex-d-column">
      <Form
        initialValues={merchForm.initialValues}
        labels={merchForm.labels}
        placeholders={merchForm.placeholders}
        types={merchForm.types}
        addEntry={sectionEntries}
        dataList={{ icon: iconList }}
        clearSelection={{ icon: true }}
        heading={`Add merchendise: ${appName}`}
        onCancel={() => navigate("/dashboard")}
        onSubmit={(values: AppValues) => addMerch(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        noScroll
        schema={{ required: ["name", "cost", "quantity"] }}
      />
    </div>
  );
};
export default AddMerch;
