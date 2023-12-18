import { useContext } from "react";
import { Form, Hero } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { PreviewValueProps } from "app-forms";
import { formatStore } from "@formatters/store/formatStore";

const EditStore = () => {
  const { storeForm, editStore } = useContext(AdminContext);
  const { appId, store } = useContext(AppContext);
  const { accessToken } = useContext(AuthContext);
  // const
  const navigate = useNavigate();
  const initialValues = formatStore({ store, desiredOrder: storeForm.desiredOrder });

  return (
    <div className="container">
      <div className="form-hero">
        <Form
          initialValues={initialValues}
          onSubmit={(values: PreviewValueProps) => editStore(values, appId)}
          heading="Edit store details"
          submitLabel={storeForm.submitLabel}
          types={storeForm.types}
          labels={storeForm.labels}
          disableForm={!accessToken}
          // responseError={formErrors.storeFormError}
          placeholders={storeForm.placeholders}
          onCancel={() => navigate(accessToken ? "/dashboard" : "/")}
          fieldHeading={storeForm.fieldHeading}
          schema={{ required: ["name", "title", "pageName"] }}
          noScroll
        />
        {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default EditStore;
