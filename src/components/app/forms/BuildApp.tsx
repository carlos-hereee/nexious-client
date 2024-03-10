import { useContext, useEffect } from "react";
import { Button, Form, Hero, Loading } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { uniqueApplist } from "@formatters/uniqeList";

const BuildApp = () => {
  const { initAppForm, initApp, themeList, languageList, formErrors, isLoading, formStatus } = useContext(AdminContext);
  const { appList } = useContext(AppContext);
  const { theme, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to dashboard on successful build
    if (formStatus === "SUCCESS") navigate("/dashboard");
  }, [formStatus]);
  if (isLoading) return <Loading message="loading app assets.." />;
  return (
    <div className="container">
      {!accessToken && (
        <div className="flex-center">
          <h3 className="heading">It looks like your not logged in</h3>{" "}
          <Button label="Go to login" onClick={() => navigate("/login")} />
        </div>
      )}
      <div className="form-hero">
        <Form
          initialValues={initAppForm.initialValues}
          onSubmit={initApp}
          heading={initAppForm.heading}
          submitLabel={initAppForm.submitLabel}
          types={initAppForm.types}
          labels={initAppForm.labels}
          theme={theme}
          disableForm={!accessToken}
          responseError={formErrors.initAppFormError}
          placeholders={initAppForm.placeholders}
          // onCancel={() => navigate(accessToken ? "/dashboard" : "/")}
          dataList={{ theme: themeList, locale: languageList, language: languageList }}
          fieldHeading={initAppForm.fieldHeading}
          schema={{
            required: ["appName", "logo"],
            unique: [{ name: "appName", list: uniqueApplist(appList) }],
          }}
        />
        {initAppForm.hero && <Hero hero={initAppForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default BuildApp;
