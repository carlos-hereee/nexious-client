import { IconButton } from "nexious-library";

interface Props {
  likeList: string[];
  messageId: string;
  theme?: string;
  activeReply?: boolean;
  replyIcon?: boolean;
  onLikeClick?: () => void;
  onReplyClick?: () => void;
  onRemovalClick?: () => void;
}
const MessageReactions = (props: Props) => {
  const { onReplyClick, onLikeClick, likeList, messageId, activeReply, replyIcon, theme, onRemovalClick } = props;
  return (
    <div className={`flex-g${theme ? ` ${theme}` : ""}`}>
      {onLikeClick && (
        <IconButton
          icon={{ icon: "heart" }}
          theme={`btn-small highlight${likeList.includes(messageId) ? ` btn-like-icon` : ""}`}
          onClick={onLikeClick}
        />
      )}
      {onReplyClick && (
        <IconButton
          icon={{ icon: replyIcon ? "reply" : "comment" }}
          theme={`highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onReplyClick}
        />
      )}
      {onRemovalClick && (
        <IconButton
          icon={{ icon: "cancel" }}
          theme={`highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onRemovalClick}
        />
      )}
      {/* {commentIcon && (
        <IconButton
          icon={{ icon: "comment" }}
          theme={`highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onReplyClick}
        />
      )} */}
    </div>
  );
};
export default MessageReactions;
