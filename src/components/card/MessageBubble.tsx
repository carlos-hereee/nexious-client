import MessageReactions from "@components/app/MessageReactions";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { CardTextBubble } from "nexious-library";
import { useContext } from "react";

interface Props {
  message: Message;
  activeMessageId?: string;
  theme?: string;
  children?: React.ReactNode;
  onLikeClick?: () => void;
  onReplyClick?: () => void;
}
const MessageBubble = ({ message, children, theme, activeMessageId, onLikeClick, onReplyClick }: Props) => {
  const { user, likeMessages } = useContext(AuthContext);
  return (
    <div className="pos-rel">
      <CardTextBubble
        data={message}
        theme={theme}
        hero={{ url: message.user?.avatar || "", alt: `${message.user?.name || "no-name"} avatar`, theme: "hero-contact-sm" }}
        sender={user.userId === message.user?.userId}
      />
      <MessageReactions
        theme="reply-reactions"
        likeList={likeMessages}
        messageId={message.messageId}
        activeReply={message.messageId === activeMessageId}
        onLikeClick={onLikeClick}
        onReplyClick={onReplyClick}
        replyIcon
      />
      {children}
    </div>
  );
};
export default MessageBubble;
