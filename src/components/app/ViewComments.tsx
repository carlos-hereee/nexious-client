import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { useContext, useState } from "react";
import CommentThread from "@components/list/CommentThread";
import { Link } from "react-router-dom";
import { MediaContext } from "@context/media/MediaContext";
import MessageBox from "./forms/MessageBox";

interface Comments {
  comments: Message[];
  allowRating?: boolean;
  reply: (val: { data: string }) => void;
  onMessageReply: (messageId: string, val: { data: string; star?: number }) => void;
}

const ViewComments = ({ comments, reply, allowRating, onMessageReply }: Comments) => {
  const { accessToken } = useContext(AuthContext);
  const [activeMessage, setActiveMessage] = useState<Message>();
  const { updateLikeMessage } = useContext(MediaContext);

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
  const handleReply = (id: string, val: { data: string; star?: number }) => {
    setActiveMessage(undefined);
    onMessageReply(id, val);
  };

  return (
    <>
      {accessToken ? (
        !activeMessage && <MessageBox onSubmit={reply} allowRating={allowRating} />
      ) : (
        <Link to="/login">Login to leave a comment</Link>
      )}
      <div className="height-75 overflow-y w-full">
        {comments.map((c) => (
          <CommentThread
            key={c.uid || c.messageId}
            comment={allowRating && c.status?.star && c.status.star >= 0 ? { ...c, rating: c.status.star } : c}
            activeMessage={activeMessage}
            onLikeClick={(m) => updateLikeMessage(m)}
            onReplyClick={toggleReplyClick}
            onMessageReply={(val) => handleReply(c.messageId, val)}
          />
        ))}
      </div>
    </>
  );
};
export default ViewComments;
