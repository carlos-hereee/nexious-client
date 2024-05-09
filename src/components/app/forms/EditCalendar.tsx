import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";

const EditCalendar = () => {
  // const { calendarForm, editCalendar, sectionEntries } = useContext(AdminContext);
  // // initial data if any
  // const { isLoading, appId, calendar } = useContext(AppContext);
  const { calendarForm, sectionEntries } = useContext(AdminContext);
  // initial data if any
  const { isLoading, calendar } = useContext(AppContext);

  const initialValues = { ...calendarForm.initialValues, name: calendar.name || "" };
  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        labels={calendarForm.labels}
        placeholders={calendarForm.placeholders}
        types={calendarForm.types}
        fieldHeading={calendarForm.fieldHeading}
        addEntry={sectionEntries}
        heading="Edit calendar"
        // onSubmit={(values: AppValues) => editCalendar({ values, appId })}
        onSubmit={(values: AppValues) => console.log("values :>> ", values)}
        submitLabel="Save and continue"
        schema={{ required: ["name", "startTime", "closeTime"] }}
        noScroll
      />
    </div>
  );
};
export default EditCalendar;
