import { useContext } from "react";
import { Form } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@app/utils/context/admin/AdminContext";
import { AppContext } from "@app/utils/context/app/AppContext";

const BuildApp = () => {
  const { appNameForm, initApp } = useContext(AdminContext);
  const { appList } = useContext(AppContext);
  // const { ownedApps } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Form
        initialValues={{ appName: "", logo: "" }}
        onSubmit={initApp}
        heading="Initialize your app!"
        submitLabel="Save and continue"
        types={appNameForm.types}
        labels={appNameForm.labels}
        placeholders={appNameForm.placeholders}
        onCancel={() => navigate("/")}
        schema={{
          required: ["appName", "logo"],
          unique: [{ name: "appName", list: appList?.map((app) => app.appName) || [] }],
        }}
      />
    </div>
  );
};
export default BuildApp;
