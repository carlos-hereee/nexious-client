import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Form, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppValues } from "app-forms";
import cal from "@data/data.json";

const EditBooking = () => {
  const { calendarBookingForm } = useContext(AdminContext);
  // initial data if any
  const { isLoading } = useContext(AppContext);

  // test data
  // const [events, setEvents] = useState<AppValues[]>([]);

  // const initialValues = { ...calendarBookingForm.initialValues };
  // console.log("events :>> ", events);
  if (isLoading) return <Loading message="Loading app data" />;
  // if (events.length <= 0) {
  //   return (
  //     <div className="primary-container">
  //       <Form
  //         initialValues={initialValues}
  //         labels={calendarBookingForm.labels}
  //         placeholders={calendarBookingForm.placeholders}
  //         types={calendarBookingForm.types}
  //         fieldHeading={calendarBookingForm.fieldHeading}
  //         heading="Create a new booking rule"
  //         dataList={{ frequency: cal.calendarData.frequency }}
  //         // onSubmit={(values: AppValues) => editCalendar({ values, appId })}
  //         // onSubmit={(values: AppValues) => setEvents((e: AppValues) => [...e, values])}
  //         submitLabel="Save and continue"
  //         schema={{ required: ["name", "startTime", "closeTime"] }}
  //         noScroll
  //       />
  //     </div>
  //   );
  // }
  return (
    <div className="container">
      <Form
        initialValues={{}}
        labels={calendarBookingForm.labels}
        placeholders={calendarBookingForm.placeholders}
        types={calendarBookingForm.types}
        fieldHeading={calendarBookingForm.fieldHeading}
        heading="Edit booking rule"
        dataList={{ frequency: cal.calendarData.frequency }}
        // onSubmit={(values: AppValues) => editCalendar({ values, appId })}
        onSubmit={(values: AppValues) => console.log("values :>> ", values)}
        submitLabel="Save and continue"
        schema={{ required: ["name", "startTime", "closeTime"] }}
        noScroll
      />
    </div>
  );
};
export default EditBooking;
