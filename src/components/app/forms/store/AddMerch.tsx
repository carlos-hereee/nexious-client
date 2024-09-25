import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { Form } from "nexious-library";
import { useContext } from "react";
import { merchForm } from "@data/forms/store.json";

const AddMerch = () => {
  const { addMerch, sectionEntries } = useContext(AdminContext);
  const { appId, appName } = useContext(AppContext);

  return (
    <div className="primary-container">
      <Form
        initialValues={merchForm.initialValues}
        labels={merchForm.labels}
        placeholders={merchForm.placeholders}
        types={merchForm.types}
        fieldHeading={merchForm.fieldHeading}
        addEntry={sectionEntries}
        heading={`Add merchendise: ${appName}`}
        onSubmit={(values: AppValues) => addMerch({ values, appId })}
        submitLabel="Save and continue"
        withFileUpload
        schema={{ required: ["name", "description", "cost", "quantity"] }}
      />
    </div>
  );
};
export default AddMerch;
