import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { formatMerch } from "@forms/formatMerch";
import { PreviewValueProps } from "app-forms";
import { InventoryItemProps } from "app-types";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const EditMerch = (props: { initValues: InventoryItemProps }) => {
  const { merchForm, editMerch, isLoading } = useContext(AdminContext);
  const { appId, appName } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  const navigate = useNavigate();
  const { initValues } = props;

  const initialValues = formatMerch({ merch: initValues, desiredOrder: merchForm.desiredOrder });

  useEffect(() => {
    if (isLoading) setStatus("loading");
  }, [isLoading]);

  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="flex-d-column">
      <Form
        initialValues={initialValues}
        labels={merchForm.labels}
        placeholders={merchForm.placeholders}
        types={merchForm.types}
        heading={`Add merchendise: ${appName}`}
        onCancel={() => navigate("/dashboard")}
        onSubmit={(values: PreviewValueProps) => editMerch(values, appId, initValues.uid)}
        submitLabel="Save and continue"
        withFileUpload
        noScroll
        schema={{ required: ["name", "cost", "quantity"] }}
      />
    </div>
  );
};
export default EditMerch;
