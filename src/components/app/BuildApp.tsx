import { useContext } from "react";
import { Form } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";

const BuildApp = () => {
  const {
    initAppForm: form,
    initApp,
    themeList,
    languageList,
    formErrors,
  } = useContext(AdminContext);
  const { appList } = useContext(AppContext);
  const { theme } = useContext(AuthContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (ownedApps.length > 0) {
  //     if (!formErrors.initAppFormError)
  //   }
  // }, [ownedApps]);
  // useNavigate()
  // console.log("formErrors :>> ", formErrors);

  // console.log("appList :>> ", appList);
  return (
    <div className="container">
      <Form
        initialValues={form.initialValues}
        onSubmit={initApp}
        heading={form.heading}
        submitLabel={form.submitLabel}
        types={form.types}
        labels={form.labels}
        theme={theme}
        responseError={formErrors.initAppFormError}
        placeholders={form.placeholders}
        onCancel={() => navigate("/")}
        dataList={{ theme: themeList, locale: languageList, language: languageList }}
        fieldHeading={form.fieldHeading}
        schema={{
          required: ["appName", "logo"],
          unique: [{ name: "appName", list: appList?.map((app) => app.appName) || [] }],
        }}
      />
    </div>
  );
};
export default BuildApp;
