import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { Subcription } from "app-types";
import { Form } from "nexious-library";
import { useContext, useState } from "react";
import { recurring, featureType } from "@data/data.json";
import { ISubscription } from "auth-context";
import { formatInitialEntryValues, formatInitialValues } from "@app/formatInitialFormValues";
import ConfirmRemovals from "@components/app/containers/ConfirmRemoval";

const EditSubscription = ({ subscription }: { subscription: ISubscription }) => {
  const { subscriptionForm, sectionEntries } = useContext(AdminContext);
  const { appId, updateSubscription, deleteSubscription } = useContext(AppContext);
  const [show, setShow] = useState(false);
  // format values
  const initialValues = formatInitialValues({ subscription, desiredOrder: subscriptionForm.desiredOrder });
  const entryValues = formatInitialEntryValues({ subscription, addEntry: sectionEntries });
  const id = subscription.subscriptionId;

  const handleRemove = () => deleteSubscription({ appId, id });
  if (show) return <ConfirmRemovals onConfirm={handleRemove} />;
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
        onSubmit={(values: Subcription) => updateSubscription({ subscription: values, appId, id })}
        onCancel={() => setShow(true)}
        confirmRemovals
        cancelLabel="Remove subscription"
        submitLabel="Save and continue"
        schema={{ required: ["name", "description", "cost", "recurring"] }}
      />
    </div>
  );
};
export default EditSubscription;
