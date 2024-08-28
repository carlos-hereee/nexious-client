import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { useContext, useState } from "react";
import CommentThread from "@components/list/CommentThread";
import { Link } from "react-router-dom";
import MessageBox from "./forms/MessageBox";

interface Comments {
  comments: Message[];
  allowRating?: boolean;
  reply: (val: { data: string }) => void;
  onLikeMessage: (val: Message) => void;
}

const ViewComments = ({ comments, reply, onLikeMessage, allowRating }: Comments) => {
  const { accessToken } = useContext(AuthContext);
  const [activeMessage, setActiveMessage] = useState<Message>();

  if (!comments || comments.length === 0) {
    return (
      <>
        <p>Be the first to leave a comment </p>
        {accessToken ? (
          <MessageBox onSubmit={reply} allowRating={allowRating} />
        ) : (
          <Link to="/login">Login to leave a comment</Link>
        )}
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
          onLikeClick={(m) => onLikeMessage(m)}
          onReplyClick={toggleReplyClick}
        />
      ))}
      {!activeMessage && <MessageBox onSubmit={reply} allowRating={allowRating} />}
    </div>
  );
};
export default ViewComments;
