import { Form } from "nexious-library";
import { notificationSettingsForm } from "@data/forms.json";
import { NSettings } from "auth-context";

interface Props {
  initialValues: NSettings;
  onSubmit: (val: { [x: string]: boolean }) => void;
}
const NotificationForm = ({ initialValues, onSubmit }: Props) => {
  return (
    <Form
      initialValues={initialValues}
      types={notificationSettingsForm.types}
      labels={notificationSettingsForm.labels}
      fieldHeading={notificationSettingsForm.fieldHeading}
      onSubmit={onSubmit}
    />
  );
};
export default NotificationForm;
