import { useContext } from "react";
import { Form, Hero } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { PreviewValueProps } from "app-forms";

const BuildStore = () => {
  const { storeForm, addStore } = useContext(AdminContext);
  const { appId } = useContext(AppContext);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-hero">
        <Form
          initialValues={storeForm.initialValues}
          onSubmit={(values: PreviewValueProps) => addStore(values, appId)}
          heading={storeForm.heading}
          submitLabel={storeForm.submitLabel}
          types={storeForm.types}
          labels={storeForm.labels}
          disableForm={!accessToken}
          // responseError={formErrors.storeFormError}
          placeholders={storeForm.placeholders}
          onCancel={() => navigate(accessToken ? "/dashboard" : "/")}
          fieldHeading={storeForm.fieldHeading}
          schema={{ required: ["name"] }}
        />
        {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default BuildStore;
