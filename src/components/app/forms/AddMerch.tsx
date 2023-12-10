import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PreviewValueProps } from "app-forms";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const AddMerch = () => {
  const { storeForm, addMerch, sectionEntries, isLoading } = useContext(AdminContext);
  const { iconList, appId, appName } = useContext(AppContext);
  // const { theme } = useContext(AuthContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) setStatus("loading");
    else setStatus("idle");
  }, [isLoading]);
  // const navigate = useNavigate();
  // const location = useLocation();

  // const pageName = location.search
  // console.log("location :>> ", location);

  // useEffect(() => {
  //   if (ownedApps.length > 0) {
  //     if (!formErrors.initAppFormError)
  //   }
  // }, [ownedApps]);
  // useNavigate()
  // console.log("formErrors :>> ", formErrors);

  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="flex-d-column">
      <Form
        initialValues={storeForm.initialValues}
        labels={storeForm.labels}
        placeholders={storeForm.placeholders}
        types={storeForm.types}
        addEntry={sectionEntries}
        dataList={{ icon: iconList }}
        clearSelection={{ icon: true }}
        heading={`${storeForm.heading}: ${appName}`}
        onCancel={() => navigate("/dashboard")}
        onSubmit={(values: PreviewValueProps) => addMerch(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        noScroll
        schema={{ required: ["name"] }}
      />
    </div>
  );
};
export default AddMerch;
