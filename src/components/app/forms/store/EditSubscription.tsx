import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { Subcription } from "app-types";
import { Form } from "nexious-library";
import { useContext } from "react";
import { recurring, featureType } from "@data/data.json";
import { SubscriptionSchema } from "auth-context";
import { formatInitialEntryValues, formatInitialValues } from "@formatters/formatInitialFormValues";

const EditSubscription = ({ subscription }: { subscription: SubscriptionSchema }) => {
  const { subscriptionForm, sectionEntries } = useContext(AdminContext);
  const { appId, updateSubscription } = useContext(AppContext);
  console.log("subscription :>> ", subscription);
  const initialValues = formatInitialValues({ subscription, desiredOrder: subscriptionForm.desiredOrder });
  console.log("initialValues :>> ", initialValues);
  const entryValues = formatInitialEntryValues({ subscription, addEntry: sectionEntries });
  console.log("entryValues :>> ", entryValues);
  return (
    <div className="primary-container">
      <Form
        initialValues={initialValues}
        labels={subscriptionForm.labels}
        placeholders={subscriptionForm.placeholders}
        types={subscriptionForm.types}
        fieldHeading={subscriptionForm.fieldHeading}
        addEntry={sectionEntries}
        entries={entryValues}
        dataList={{ recurring, valueType: featureType }}
        heading="Update subscription:"
        onSubmit={(values: Subcription) =>
          updateSubscription({ subscription: values, appId, id: subscription.subscriptionId })
        }
        // onSubmit={(values: Subcription) => console.log("values :>> ", values)}
        submitLabel="Save and continue"
        schema={{ required: ["name", "description", "cost", "recurring"] }}
      />
    </div>
  );
};
export default EditSubscription;
