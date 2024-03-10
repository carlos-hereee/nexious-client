import { useContext } from "react";
import { Form, Hero, Loading } from "nexious-library";
// import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { AppValues } from "app-forms";

const BuildStore = () => {
  const { storeForm, addStore, isLoading } = useContext(AdminContext);
  const { appId, email } = useContext(AppContext);
  const { accessToken } = useContext(AuthContext);
  // const navigate = useNavigate();

  if (isLoading) return <Loading message="loading app assets.." />;
  return (
    <div className="container">
      <div className="form-hero">
        <Form
          initialValues={{ ...storeForm.initialValues, email: email || "" }}
          onSubmit={(values: AppValues) => addStore(values, appId)}
          heading={storeForm.heading}
          submitLabel={storeForm.submitLabel}
          types={storeForm.types}
          labels={storeForm.labels}
          disableForm={!accessToken}
          // responseError={formErrors.storeFormError}
          placeholders={storeForm.placeholders}
          populateLink={{
            isRegistered: [
              {
                word: "Stripe Connected Account Agreement.",
                link: "https://stripe.com/legal/connect-account",
              },
            ],
            termsOfService: [
              {
                word: "Stripe Connected Account Agreement",
                link: "https://stripe.com/legal/connect-account",
              },
              {
                word: "Stripe Terms of Service",
                link: "https://stripe.com/legal/ssa",
              },
            ],
          }}
          // onCancel={() => navigate(accessToken ? "/dashboard" : "/")}
          fieldHeading={storeForm.fieldHeading}
          schema={{
            required: ["storeName", "pageName", "email", "isRegistered", "termsOfService"],
          }}
          noScroll
        />
        {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default BuildStore;
