import { Form, Rating } from "nexious-library";
import { useState } from "react";

interface Props {
  allowRating?: boolean;
  onSubmit: (val: { data: string; star?: number }) => void;
}
const MessageBox = ({ onSubmit, allowRating }: Props) => {
  const [star, setStar] = useState(0);
  if (allowRating) {
    return (
      <>
        <Rating star={star} onClick={setStar} />
        <Form
          initialValues={{ data: "" }}
          types={{ data: "textarea" }}
          theme="message-box"
          hideLabels
          submitLabel=" "
          submitIcon="reply"
          onSubmit={(val: { data: string }) => onSubmit({ ...val, star })}
        />
      </>
    );
  }
  return (
    <Form
      initialValues={{ data: "" }}
      types={{ data: "textarea" }}
      hideLabels
      theme="message-box"
      submitLabel=" "
      submitIcon="reply"
      onSubmit={(val: { data: string }) => onSubmit(val)}
    />
  );
};
export default MessageBox;
