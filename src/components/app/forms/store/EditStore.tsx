import { useContext } from "react";
import { Form } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { formatStore } from "@formatters/store/formatStore";
import { Hero } from "nexious-library/@nxs-molecules";

const EditStore = () => {
  const { storeForm, editStore } = useContext(AdminContext);
  const { appId, store } = useContext(AppContext);

  // const
  const initialValues = formatStore({ store, desiredOrder: storeForm.desiredOrder });

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
          placeholders={storeForm.placeholders}
          fieldHeading={storeForm.fieldHeading}
          schema={{ required: ["name", "title", "pageName", "email"] }}
          noScroll
        />
        {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default EditStore;
