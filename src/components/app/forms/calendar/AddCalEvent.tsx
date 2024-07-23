import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { calendarData, forms } from "@data/data.json";
import { IEvent } from "app-calendar";

const AddCalEvent = () => {
  // initial data if any
  const { isLoading, appId, addCalendarEvent } = useContext(AppContext);
  const { initialValues, labels, placeholders, types } = forms.calendarEventForm;

  if (isLoading) return <Loading message="Loading app data" />;
  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        heading="Create calendar event"
        labels={labels}
        placeholders={placeholders}
        types={types}
        dataList={{ startTime: calendarData.hours, closeTime: calendarData.hours }}
        onSubmit={(event: IEvent) => addCalendarEvent({ event, appId })}
        submitLabel="Save and continue"
        // schema={{ required: ["name"] }}
      />
    </div>
  );
};
export default AddCalEvent;
