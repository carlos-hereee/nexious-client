import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { CardTextBubble } from "nexious-library";
import { useContext } from "react";

interface Props {
  message: Message;
  children?: React.ReactNode;
}
const MessageBubble = ({ message, children }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <CardTextBubble
        data={message}
        hero={{ url: message.user.avatar, alt: `${message.user.name} avatar`, theme: "hero-contact-sm" }}
        sender={user.userId === message.user.userId}
      />
      {message.replies.length > 0 &&
        message.replies.map((reply) => (
          <CardTextBubble
            key={reply.uid}
            data={reply}
            hero={{ url: reply.user, alt: `${message.user.name} avatar`, theme: "hero-contact" }}
            sender={user.userId === message.user.userId}
          />
        ))}
      {children}
    </>
  );
};
export default MessageBubble;
