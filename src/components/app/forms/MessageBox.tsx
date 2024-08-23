import { Form } from "nexious-library";

const MessageBox = ({ onSubmit }: { onSubmit: (val: { data: string }) => void }) => {
  return (
    <Form
      initialValues={{ data: "" }}
      types={{ data: "textarea" }}
      hideLabels
      submitLabel=" "
      submitIcon="reply"
      onSubmit={(val: { data: string }) => onSubmit(val)}
    />
  );
};
export default MessageBox;
