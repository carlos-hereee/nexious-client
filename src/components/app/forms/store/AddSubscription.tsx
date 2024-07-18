import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { Subcription } from "app-types";
import { Form } from "nexious-library";
import { useContext } from "react";
import { recurring, featureType } from "@data/data.json";

const AddSubscription = () => {
  const { subscriptionForm, sectionEntries } = useContext(AdminContext);
  const { appId, createSubscription } = useContext(AppContext);

  return (
    <div className="primary-container">
      <Form
        initialValues={subscriptionForm.initialValues}
        labels={subscriptionForm.labels}
        placeholders={subscriptionForm.placeholders}
        types={subscriptionForm.types}
        fieldHeading={subscriptionForm.fieldHeading}
        addEntry={sectionEntries}
        dataList={{ recurring, valueType: featureType }}
        heading="Create new subscription:"
        onSubmit={(values: Subcription) => createSubscription({ subscription: values, appId })}
        submitLabel="Save and continue"
        schema={{ required: ["name", "description", "cost"] }}
      />
    </div>
  );
};
export default AddSubscription;
