import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { OnclickProps } from "app-admin";
import { PreviewValueProps } from "app-forms";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const AddPage = (props: OnclickProps) => {
  const { pagesForm, addPage, sectionEntries, isLoading } = useContext(AdminContext);
  const { iconList, appId } = useContext(AppContext);
  const { onCancelClick } = props;
  // const { theme } = useContext(AuthContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  // const navigate = useNavigate();

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
        initialValues={pagesForm.initialValues}
        labels={pagesForm.labels}
        placeholders={pagesForm.placeholders}
        types={pagesForm.types}
        addEntry={sectionEntries}
        dataList={{ icon: iconList }}
        clearSelection={{ icon: true }}
        heading="Add page content"
        onCancel={onCancelClick}
        // onCancel={() => navigate("/dashboard")}
        onSubmit={(values: PreviewValueProps) => addPage(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        noScroll
        schema={{ required: ["title", "name"] }}
      />
    </div>
  );
};
export default AddPage;
