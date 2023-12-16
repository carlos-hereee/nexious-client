import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { PreviewValueProps } from "app-forms";
import { formatAppDetails } from "@forms/formatAppDetails";
import { OnclickProps } from "app-admin";
import { uniqueApplist } from "@forms/uniqeList";

const EditAppDetails = (props: OnclickProps) => {
  const { editAppDetails, appDetailsForm, languageList, themeList, iconList } =
    useContext(AdminContext);
  const { onCancelClick } = props;
  // initial data if any
  const { logo, isLoading, appName, appList, appId, locale } = useContext(AppContext);
  useContext(AppContext);

  const initialValues = formatAppDetails({
    app: { logo, appName, locale },
    desiredOrder: appDetailsForm.desiredOrder,
  });
  const formDataList = {
    language: languageList,
    locale: languageList,
    icon: iconList,
    theme: themeList,
  };
  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <Form
        initialValues={initialValues}
        labels={appDetailsForm.labels}
        placeholders={appDetailsForm.placeholders}
        types={appDetailsForm.types}
        fieldHeading={appDetailsForm.fieldHeading}
        dataList={formDataList}
        clearSelection={{ icon: true }}
        onCancel={onCancelClick}
        heading={`Editing app details: ${appName}`}
        onSubmit={(values: PreviewValueProps) => editAppDetails(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{
          required: ["appName", "logo"],
          unique: [{ name: "appName", list: uniqueApplist(appList) }],
        }}
        noScroll
      />
    </div>
  );
};
export default EditAppDetails;
