import { useContext } from "react";
import { Form } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@app/utils/context/admin/AdminContext";
import { AppContext } from "@app/utils/context/app/AppContext";

const BuildApp = () => {
  const { appNameForm, initApp, themeList, languageList } = useContext(AdminContext);
  const { appList, theme } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Form
        initialValues={{
          appName: "",
          logo: "",
          theme: "light-mode,dark-mode,",
          language: "",
        }}
        onSubmit={initApp}
        heading="Initialize your app!"
        submitLabel="Save and continue"
        types={appNameForm.types}
        labels={appNameForm.labels}
        theme={theme}
        placeholders={appNameForm.placeholders}
        onCancel={() => navigate("/")}
        dataList={{ theme: themeList, language: languageList }}
        fieldHeading={{
          appName: "App name",
          logo: "Logo",
          theme: "Themes",
          language: "Language",
        }}
        schema={{
          required: ["appName", "logo", "language"],
          unique: [{ name: "appName", list: appList?.map((app) => app.appName) || [] }],
        }}
      />
    </div>
  );
};
export default BuildApp;
