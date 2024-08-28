import { Form } from "nexious-library";

interface Props {
  allowRating?: boolean;
  onSubmit: (val: { data: string }) => void;
}
const MessageBox = ({ onSubmit, allowRating }: Props) => {
  console.log("allowRating :>> ", allowRating);
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
