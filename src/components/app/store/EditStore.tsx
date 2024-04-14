import { useContext, useState } from "react";
import { Button, ButtonCancel, Form, Hero } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { formatStore } from "@formatters/store/formatStore";

const EditStore = () => {
  const { storeForm, editStore, deleteStore } = useContext(AdminContext);
  const { appId, store } = useContext(AppContext);

  const [show, setShow] = useState(false);
  // const
  const initialValues = formatStore({ store, desiredOrder: storeForm.desiredOrder });

  return (
    <div className="container">
      {show ? (
        <div className="container">
          <h2 className="heading">Are you sure you want to delete {store?.name}</h2>
          <p>This will delete all progress</p>
          <div className="flex-center">
            <ButtonCancel onClick={() => setShow(false)} theme="btn-main" />
            <Button label="Confirm" onClick={() => deleteStore(appId)} />
          </div>
        </div>
      ) : (
        <div className="form-hero">
          <Form
            initialValues={initialValues}
            onSubmit={(values: AppValues) => editStore(values, appId)}
            heading="Edit store details"
            submitLabel={storeForm.submitLabel}
            types={storeForm.types}
            labels={storeForm.labels}
            placeholders={storeForm.placeholders}
            onCancel={() => setShow(true)}
            cancelLabel="Delete store"
            fieldHeading={storeForm.fieldHeading}
            schema={{ required: ["name", "title", "pageName", "email"] }}
            noScroll
          />
          {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
        </div>
      )}
    </div>
  );
};
export default EditStore;
