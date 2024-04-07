import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import cal from "@data/data.json";

const EditCalendar = () => {
  const { calendarForm, editCalendar, sectionEntries } = useContext(AdminContext);
  // initial data if any
  const { isLoading, appId, calendar } = useContext(AppContext);

  const initialValues = { ...calendarForm.initialValues, name: calendar.name || "" };
  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <Form
        initialValues={initialValues}
        labels={calendarForm.labels}
        placeholders={calendarForm.placeholders}
        types={calendarForm.types}
        fieldHeading={calendarForm.fieldHeading}
        addEntry={sectionEntries}
        heading="Edit calendar"
        dataList={{
          workWeek: cal.calendarData.week,
          day: cal.calendarData.week,
          startTime: cal.calendarData.hours,
          closeTime: cal.calendarData.hours,
        }}
        onSubmit={(values: AppValues) => editCalendar({ values, appId })}
        submitLabel="Save and continue"
        schema={{ required: ["name"] }}
        noScroll
      />
    </div>
  );
};
export default EditCalendar;
