import { useContext, useEffect } from "react";
import { Form, Button, Loading } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { uniqueApplist } from "@app/uniqeList";

const BuildApp = () => {
  const { initAppForm, initApp, themeList, languageList, formErrors, isLoading, formStatus, setFormStatus } =
    useContext(AdminContext);
  const { appList } = useContext(AppContext);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to dashboard on successful build
    if (formStatus === "SUCCESS") {
      navigate("/dashboard");
      setFormStatus("IDLE");
    }
  }, [formStatus]);

  if (isLoading) return <Loading message="loading app assets.." />;
  return (
    <div className="primary-container">
      {!accessToken && (
        <div className="flex-center">
          <h3 className="heading">It looks like your not logged in</h3>{" "}
          <Button label="Go to login" onClick={() => navigate("/login")} />
        </div>
      )}
      {/* <div className="form-hero w-full"> */}
      <Form
        initialValues={initAppForm.initialValues}
        onSubmit={initApp}
        heading={initAppForm.heading}
        submitLabel={initAppForm.submitLabel}
        types={initAppForm.types}
        labels={initAppForm.labels}
        // theme={theme}
        disableForm={!accessToken}
        responseError={formErrors.initAppFormError}
        placeholders={initAppForm.placeholders}
        dataList={{ theme: themeList, locale: languageList, language: languageList }}
        fieldHeading={initAppForm.fieldHeading}
        schema={{
          required: ["appName", "logo"],
          unique: [{ name: "appName", list: uniqueApplist(appList) }],
        }}
      />
    </div>
    // </div>
  );
};
export default BuildApp;
