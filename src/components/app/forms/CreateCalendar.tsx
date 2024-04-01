import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";

const CreateCalendar = () => {
  const { calendarForm, createCalendar } = useContext(AdminContext);
  // initial data if any
  const { isLoading, appId } = useContext(AppContext);

  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <Form
        initialValues={calendarForm.initialValues}
        labels={calendarForm.labels}
        placeholders={calendarForm.placeholders}
        types={calendarForm.types}
        fieldHeading={calendarForm.fieldHeading}
        onSubmit={(values: AppValues) => createCalendar({ values, appId })}
        submitLabel="Save and continue"
        withFileUpload
        schema={{ required: ["name"] }}
        noScroll
      />
    </div>
  );
};
export default CreateCalendar;
