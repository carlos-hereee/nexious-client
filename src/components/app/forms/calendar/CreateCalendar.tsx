import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import cal from "@data/data.json";

const CreateCalendar = () => {
  const { calendarForm, createCalendar, sectionEntries } = useContext(AdminContext);
  // initial data if any
  const { isLoading, appId } = useContext(AppContext);

  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="primary-container">
      <Form
        initialValues={calendarForm.initialValues}
        heading="Create calendar"
        labels={calendarForm.labels}
        placeholders={calendarForm.placeholders}
        types={calendarForm.types}
        addEntry={sectionEntries}
        fieldHeading={calendarForm.fieldHeading}
        dataList={{
          workWeek: cal.calendarData.week,
          day: cal.calendarData.week,
          startTime: cal.calendarData.hours,
          closeTime: cal.calendarData.hours,
        }}
        onSubmit={(values: AppValues) => createCalendar({ values, appId })}
        submitLabel="Save and continue"
        schema={{ required: ["name"] }}
        noScroll
      />
    </div>
  );
};
export default CreateCalendar;
