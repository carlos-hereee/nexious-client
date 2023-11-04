import { useContext } from "react";
import { PaginateForm } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@app/utils/context/admin/AdminContext";
import { FormValueProps } from "app-forms";
import { AppContext } from "@app/utils/context/app/AppContext";
import { AuthContext } from "@app/utils/context/auth/AuthContext";

const BuildApp = () => {
  const { landingPageForm, appNameForm, initApp, formErrors } = useContext(AdminContext);
  const { appList } = useContext(AppContext);
  // const { ownedApps } = useContext(AuthContext);
  const navigate = useNavigate();

  const paginate: FormValueProps[] = [
    {
      formName: "appName",
      heading: "Initialize your app",
      initialValues: appNameForm.initialValues,
      types: appNameForm.types,
      labels: appNameForm.labels,
      placeholders: appNameForm.placeholders,
      submitLabel: "Save and continue",
      schema: {
        required: ["appName", "logo"],
        unique: [{ name: "appName", list: appList?.map((app) => app.appName) || [] }],
      },
      onSubmit: initApp,
    },
    {
      formName: "landing",
      heading: "Build landing page",
      initialValues: landingPageForm.initialValues,
      submitLabel: "Save and continue",
      labels: landingPageForm.labels,
      types: landingPageForm.types,
      placeholders: landingPageForm.placeholders,
    },
  ];
  // console.log("appList :>> ", appList);
  // console.log("formErrors", formErrors);
  // console.log("apps", apps);
  return (
    <div className="container">
      {paginate && paginate.length > 0 && (
        <PaginateForm
          paginate={paginate}
          onCancel={() => navigate("/")}
          responseError={formErrors.initAppFormError}
        />
      )}
    </div>
  );
};
export default BuildApp;
