import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { Button } from "nexious-library";
import { useContext, useState } from "react";
import CommentThread from "@components/list/CommentThread";
import MessageBox from "./forms/MessageBox";
// import MessageReactions from "./MessageReactions";

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
    if (m.messageId === activeMessage?.messageId) setActiveMessage(undefined);
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
        // <div key={comment.uid} className="thread">
        //   <MessageBubble
        //     message={comment}
        //     activeMessageId={activeMessage?.messageId}
        //     onReplyClick={() => toggleReplyClick(comment)}
        //     onLikeClick={() => console.log("click")}
        //   />

        //   {comment.replies.length > 0 &&
        //     comment.replies.map((r) => (
        //       <MessageBubble
        //         message={r}
        //         key={r.replyId}
        //         activeMessageId={activeMessage?.messageId}
        //         theme="nested-reply"
        //         onReplyClick={() => toggleReplyClick(r)}
        //         onLikeClick={() => console.log("object :>> ", r)}
        //       >
        //         {/* <MessageReactions
        //           theme="reply-reactions"
        //           // likeList={r.status.messageLikes || []}
        //           likeList={[]}
        //           messageId={r.replyId || ""}
        //           activeReply={r.replyId === activeMessage?.messageId}
        //           onLikeClick={() => console.log("click")}
        //           onReplyClick={() => toggleReplyClick(r)}
        //           replyIcon
        //         /> */}
        //       </MessageBubble>
        //     ))}

        // </div>
      ))}
      {!activeMessage && <MessageBox onSubmit={reply} />}
    </div>
  );
};
export default ViewComments;
