import MessageBubble from "@components/card/MessageBubble";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { Button, Form } from "nexious-library";
import { useContext } from "react";

interface Comments {
  comments: Message[];
  reply: (val: { data: string }) => void;
}
const ViewComments = ({ comments, reply }: Comments) => {
  const { accessToken } = useContext(AuthContext);
  console.log("comments :>> ", comments);
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
  return (
    <div className="y-overflow">
      {comments.map((comment) => (
        <MessageBubble key={comment.uid} message={comment}>
          {" "}
        </MessageBubble>
      ))}
    </div>
  );
};
export default ViewComments;
