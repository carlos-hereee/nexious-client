import MessageBox from "@components/app/forms/MessageBox";
import MessageBubble from "@components/card/MessageBubble";
import { MediaContext } from "@context/media/MediaContext";
import { Message } from "app-types";
import { useContext } from "react";

interface Props {
  comment: Message;
  activeMessage?: Message;
  theme?: string;
  onLikeClick: (comment: Message) => void;
  onReplyClick: (comment: Message) => void;
}
const CommentThread = ({ comment, activeMessage, theme, onLikeClick, onReplyClick }: Props) => {
  const { postMessageReply, posts } = useContext(MediaContext);
  console.log("comment :>> ", comment.replies);
  return (
    <div className={`thread${theme ? ` ${theme}` : ""}`}>
      <MessageBubble
        message={comment}
        activeMessageId={activeMessage?.messageId}
        onReplyClick={() => onReplyClick(comment)}
        onLikeClick={() => onLikeClick(comment)}
      />

      {/* {comment.replies.length > 0 &&
        comment.replies.map((r) => (
          <CommentThread
            comment={r}
            key={r.replyId}
            activeMessageId={activeMessageId}
            theme="nested-reply"
            onReplyClick={() => onReplyClick(r)}
            onLikeClick={() => onLikeClick(r)}
          >
            <MessageReactions
                  theme="reply-reactions"
                  // likeList={r.status.messageLikes || []}
                  likeList={[]}
                  messageId={r.replyId || ""}
                  activeReply={r.replyId === activeMessage?.messageId}
                  onLikeClick={() => console.log("click")}
                  onReplyClick={() => toggleReplyClick(r)}
                  replyIcon
                />
          </CommentThread>
        ))} */}
      {activeMessage?.messageId === comment.messageId && (
        <div className="container">
          <p>To: {activeMessage.user.name || "no-name"}</p>
          <MessageBox onSubmit={(val) => postMessageReply({ reply: val, messageId: activeMessage.messageId, posts })} />
        </div>
      )}
    </div>
  );
};
export default CommentThread;
