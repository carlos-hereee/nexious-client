import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import { formatPage } from "@formatters/formatPage";

const EditLanding = () => {
  const { editLandingPage, landingForm, languageList, sectionEntries, iconList } = useContext(AdminContext);
  // initial data if any
  const { landing, appName, appId } = useContext(AppContext);
  useContext(AppContext);

  const initialValues = formatPage({ values: landing, desiredOrder: landingForm.desiredOrder, hasEntry: sectionEntries });

  // console.log("initialValues :>> ", initialValues);
  // console.log("landing :>> ", landing);

  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        labels={landingForm.labels}
        placeholders={landingForm.placeholders}
        types={landingForm.types}
        fieldHeading={landingForm.fieldHeading}
        addEntry={sectionEntries}
        dataList={{ language: languageList, locale: languageList, icon: iconList }}
        clearSelection={{ icon: true }}
        heading={`Editing landing page: ${appName}`}
        onSubmit={(values: AppValues) => editLandingPage(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{ required: ["appName", "logo"] }}
        noScroll
      />
    </div>
  );
};
export default EditLanding;
