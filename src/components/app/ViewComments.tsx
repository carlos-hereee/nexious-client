import { AuthContext } from "@context/auth/AuthContext";
import { Button, Form } from "nexious-library";
import { useContext } from "react";

interface Comments {
  comments: string[];
  reply: (val: { data: string }) => void;
}
const ViewComments = ({ comments, reply }: Comments) => {
  const { accessToken } = useContext(AuthContext);
  if (!comments || comments.length === 0) {
    return (
      <>
        <p>Be the first to leave a comment </p>
        {accessToken ? (
          <Form
            initialValues={{ data: "" }}
            labels={{ data: " " }}
            types={{ data: "textarea" }}
            submitLabel=" "
            submitIcon="reply"
            onSubmit={(val: { data: string }) => reply(val)}
          />
        ) : (
          <Button label="Create an account" />
        )}
      </>
    );
  }
  return <div>VIEW COMMENTS</div>;
};
export default ViewComments;
