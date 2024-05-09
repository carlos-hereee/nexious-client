import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import { formatAppDetails } from "@formatters/formatAppDetails";
import { uniqueApplist } from "@formatters/uniqeList";

const EditAppDetails = () => {
  const { editAppDetails, appDetailsForm, themeList, iconList } = useContext(AdminContext);
  // const { editAppDetails, appDetailsForm, languageList, themeList, iconList } = useContext(AdminContext);
  // initial data if any
  const { logo, isLoading, appName, appList, appId } = useContext(AppContext);
  useContext(AppContext);

  // const initialValues = formatAppDetails({ app: { logo, appName, locale }, desiredOrder: appDetailsForm.desiredOrder });
  const initialValues = formatAppDetails({ app: { logo, appName }, desiredOrder: appDetailsForm.desiredOrder });
  // const formDataList = { language: languageList, locale: languageList, icon: iconList, theme: themeList };
  const formDataList = { icon: iconList, theme: themeList };
  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        labels={appDetailsForm.labels}
        placeholders={appDetailsForm.placeholders}
        types={appDetailsForm.types}
        fieldHeading={appDetailsForm.fieldHeading}
        dataList={formDataList}
        clearSelection={{ icon: true }}
        heading={`Editing app details: ${appName}`}
        onSubmit={(values: AppValues) => editAppDetails(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{
          required: ["appName", "logo"],
          unique: [{ name: "appName", list: uniqueApplist(appList, appName) }],
        }}
        noScroll
      />
    </div>
  );
};
export default EditAppDetails;
