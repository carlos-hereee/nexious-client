import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { PreviewValueProps } from "app-forms";
import { OnclickProps } from "app-admin";
import { formatPage } from "@forms/formatPage";

const EditLanding = (props: OnclickProps) => {
  const { editLandingPage, landingForm, languageList, sectionEntries } = useContext(AdminContext);
  const { onCancelClick } = props;
  // initial data if any
  const { landing, isLoading, appName, appList, appId } = useContext(AppContext);
  useContext(AppContext);

  const initialValues = formatPage({
    values: landing,
    desiredOrder: landingForm.desiredOrder || [""],
    hasEntry: sectionEntries,
  });

  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <Form
        initialValues={initialValues}
        labels={landingForm.labels}
        placeholders={landingForm.placeholders}
        types={landingForm.types}
        fieldHeading={landingForm.fieldHeading}
        addEntry={sectionEntries}
        dataList={{ language: languageList, locale: languageList }}
        clearSelection={{ icon: true }}
        onCancel={onCancelClick}
        heading={`Editing app details: ${appName}`}
        onSubmit={(values: PreviewValueProps) => editLandingPage(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{
          required: ["appName", "logo"],
          unique: [
            {
              name: "appName",
              list: appList ? appList.filter((app) => app.appName && app.appName !== appName) : [],
            },
          ],
        }}
        noScroll
      />
    </div>
  );
};
export default EditLanding;
