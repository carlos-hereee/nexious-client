import { useContext } from "react";
import { Form } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { formatInitialValues } from "@app/formatInitialFormValues";
import { currencyList } from "@data/data.json";
import { storeForm } from "@data/forms/store.json";

const EditStore = () => {
  const { editStore } = useContext(AdminContext);
  const { appId, store } = useContext(AppContext);

  const initialValues = formatInitialValues({ store, desiredOrder: storeForm.desiredOrder });
  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        onSubmit={(values: AppValues) => editStore({ values, appId })}
        heading="Edit store details"
        submitLabel="Save and continue"
        types={storeForm.types}
        labels={storeForm.labels}
        dataList={{ currency: currencyList }}
        placeholders={storeForm.placeholders}
        fieldHeading={storeForm.fieldHeading}
        schema={storeForm.schema}
        noScroll
      />
    </div>
  );
};
export default EditStore;
