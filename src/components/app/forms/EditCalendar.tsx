import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import { formatInitialValues } from "@app/formatInitialFormValues";
import cal from "@data/data.json";

const EditCalendar = () => {
  const { calendarForm, sectionEntries, editCalendar } = useContext(AdminContext);
  // initial data if any
  const { isLoading, calendar, appId } = useContext(AppContext);

  const initialValues = formatInitialValues({ calendar, desiredOrder: calendarForm.desiredOrder });

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
        dataList={{
          workWeek: cal.calendarData.week,
          day: cal.calendarData.week,
          startTime: cal.calendarData.hours,
          closeTime: cal.calendarData.hours,
        }}
        heading="Edit calendar"
        onSubmit={(values: AppValues) => editCalendar({ values, appId })}
        // onSubmit={(values: AppValues) => console.log("values :>> ", values)}
        submitLabel="Save and continue"
        schema={{ required: ["name", "startTime", "closeTime"] }}
        noScroll
      />
    </div>
  );
};
export default EditCalendar;
