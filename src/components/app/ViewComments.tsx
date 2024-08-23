import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { Button } from "nexious-library";
import { useContext, useState } from "react";
import CommentThread from "@components/list/CommentThread";
import MessageBox from "./forms/MessageBox";

interface Comments {
  comments: Message[];
  reply: (val: { data: string }) => void;
}

const ViewComments = ({ comments, reply }: Comments) => {
  const { accessToken } = useContext(AuthContext);
  const [activeMessage, setActiveMessage] = useState<Message>();

  if (!comments || comments.length === 0) {
    return (
      <>
        <p>Be the first to leave a comment </p>
        {accessToken ? <MessageBox onSubmit={reply} /> : <Button label="Create an account" />}
      </>
    );
  }

  const toggleReplyClick = (m: Message) => {
    if (!activeMessage || activeMessage.messageId !== m.messageId) setActiveMessage(m);
    else setActiveMessage(undefined);
  };
  return (
    <div className="y-overflow">
      {comments.map((comment) => (
        <CommentThread
          key={comment.uid}
          comment={comment}
          activeMessage={activeMessage}
          onLikeClick={(c) => console.log("c :>> ", c)}
          onReplyClick={toggleReplyClick}
        />
      ))}
      {!activeMessage && <MessageBox onSubmit={reply} />}
    </div>
  );
};
export default ViewComments;
