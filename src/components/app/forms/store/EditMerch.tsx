import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { formatMerch } from "@formatters/store/formatMerch";
import { AppValues } from "app-forms";
import { Button, ButtonCancel, Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";
import { MerchProps } from "services-context";

const EditMerch = (props: { initValues: MerchProps }) => {
  const { merchForm, editMerch, isLoading, deleteMerchItem } = useContext(AdminContext);
  const { appId, appName } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  const { initValues } = props;
  const [show, setShow] = useState(false);
  const initialValues = formatMerch({ merch: initValues, desiredOrder: merchForm.desiredOrder });

  useEffect(() => {
    if (isLoading) setStatus("loading");
  }, [isLoading]);

  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="primary-container">
      {show ? (
        <div className="container">
          <h2 className="heading">Are you sure you want to delete {initValues?.name}</h2>
          <p>This will delete all progress</p>
          <div className="flex-center">
            <ButtonCancel onClick={() => setShow(false)} theme="btn-main" />
            <Button label="Confirm" onClick={() => deleteMerchItem(appId, initValues.merchId)} />
          </div>
        </div>
      ) : (
        <Form
          initialValues={initialValues}
          labels={merchForm.labels}
          placeholders={merchForm.placeholders}
          types={merchForm.types}
          heading={`Add merchendise: ${appName}`}
          onCancel={() => setShow(true)}
          onSubmit={(values: AppValues) => editMerch(values, appId, initValues.uid)}
          submitLabel="Save and continue"
          withFileUpload
          cancelLabel="Delete merch"
          noScroll
          schema={{ required: ["name", "cost", "quantity"] }}
        />
      )}
    </div>
  );
};
export default EditMerch;
