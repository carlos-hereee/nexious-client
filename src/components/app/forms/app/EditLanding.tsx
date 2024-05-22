import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import { formatInitialEntryValues, formatInitialValues } from "@formatters/formatInitialFormValues";

const EditLanding = () => {
  const { editLandingPage, landingForm, sectionEntries, iconList } = useContext(AdminContext);
  // initial data if any
  const { landing, appName, appId } = useContext(AppContext);

  if (!landing) return <Loading />;

  const initialValues = formatInitialValues({ landing, desiredOrder: landingForm.desiredOrder });
  const entryValues = formatInitialEntryValues({ page: landing, addEntry: sectionEntries });

  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        labels={landingForm.labels}
        placeholders={landingForm.placeholders}
        types={landingForm.types}
        fieldHeading={landingForm.fieldHeading}
        addEntry={sectionEntries}
        entries={entryValues}
        dataList={{ icon: iconList }}
        clearSelection={{ icon: true }}
        heading={`Editing landing page: ${appName}`}
        onSubmit={(values: AppValues) => editLandingPage(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{ required: ["appName", "logo"] }}
      />
    </div>
  );
};
export default EditLanding;
