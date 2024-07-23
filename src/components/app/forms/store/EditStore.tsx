import { useContext } from "react";
import { Form, Hero } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { formatInitialValues } from "@app/formatInitialFormValues";
import { currencyList } from "@data/data.json";

const EditStore = () => {
  const { storeForm, editStore } = useContext(AdminContext);
  const { appId, store } = useContext(AppContext);

  const initialValues = formatInitialValues({ store, desiredOrder: storeForm.desiredOrder });
  return (
    <div className="primary-container">
      <div className="form-hero">
        <Form
          initialValues={initialValues}
          onSubmit={(values: AppValues) => editStore(values, appId)}
          heading="Edit store details"
          submitLabel={storeForm.submitLabel}
          types={storeForm.types}
          labels={storeForm.labels}
          dataList={{ currency: currencyList }}
          placeholders={storeForm.placeholders}
          fieldHeading={storeForm.fieldHeading}
          schema={storeForm.schema}
          noScroll
        />
        {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default EditStore;
