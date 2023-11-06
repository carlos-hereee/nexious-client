import { useContext } from "react";
import { Form } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@app/utils/context/admin/AdminContext";
import { AppContext } from "@app/utils/context/app/AppContext";
import { AuthContext } from "@app/utils/context/auth/AuthContext";

const BuildApp = () => {
  const { initAppForm: form, initApp, themeList, languageList } = useContext(AdminContext);
  const { appList } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

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
        placeholders={form.placeholders}
        onCancel={() => navigate("/")}
        dataList={{ theme: themeList, locale: languageList, language: languageList }}
        fieldHeading={form.fieldHeading}
        schema={{
          required: ["appName", "logo", "locale"],
          unique: [{ name: "appName", list: appList?.map((app) => app.appName) || [] }],
        }}
      />
    </div>
  );
};
export default BuildApp;
