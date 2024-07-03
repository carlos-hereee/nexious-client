import ConfirmRemovals from "@components/app/containers/ConfirmRemoval";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { formatInitialEntryValues, formatInitialValues } from "@formatters/formatInitialFormValues";
import { AppValues } from "app-forms";
import { Form } from "nexious-library";
import { useContext, useState } from "react";
import { MerchProps } from "store-context";

const EditMerch = (props: { initValues: MerchProps }) => {
  const { merchForm, editMerch, deleteMerchItem, sectionEntries } = useContext(AdminContext);
  const { appId } = useContext(AppContext);
  const { initValues } = props;
  const [show, setShow] = useState(false);
  const initialValues = formatInitialValues({ merch: initValues, desiredOrder: merchForm.desiredOrder });
  const entryValues = formatInitialEntryValues({ merch: initValues, addEntry: sectionEntries });

  const handleRemove = () => deleteMerchItem(appId, initValues.merchId);
  return (
    <div className="primary-container">
      {show ? (
        <ConfirmRemovals name={initValues.name} onConfirm={handleRemove} onReturn={() => setShow(false)} />
      ) : (
        <Form
          initialValues={initialValues}
          labels={merchForm.labels}
          placeholders={merchForm.placeholders}
          types={merchForm.types}
          addEntry={sectionEntries}
          entries={entryValues}
          fieldHeading={merchForm.fieldHeading}
          onCancel={() => setShow(true)}
          onSubmit={(values: AppValues) => editMerch(values, appId, initValues.merchId)}
          submitLabel="Save and continue"
          withFileUpload
          cancelLabel="Delete merch"
          schema={{ required: ["name", "description", "cost", "quantity"] }}
        />
      )}
    </div>
  );
};
export default EditMerch;
