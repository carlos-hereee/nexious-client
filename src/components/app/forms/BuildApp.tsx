import { useContext } from "react";
import { Form, Hero } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { uniqueApplist } from "@forms/uniqeList";

const BuildApp = () => {
  const { initAppForm, initApp, themeList, languageList, formErrors } = useContext(AdminContext);
  const { appList } = useContext(AppContext);
  const {
    theme,
    accessToken,
    // user
  } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log("accessToken :>> ", !accessToken);
  // console.log("user :>> ", user);

  return (
    <div className="container">
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
          onCancel={() => navigate("/")}
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
