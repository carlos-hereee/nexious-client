import { useContext, useEffect, useState } from "react";
import { Button, CardTextBubble, Hero } from "nexious-library";
import { Post } from "media-context";
import { sortList } from "@app/sortList";
import { AuthContext } from "@context/auth/AuthContext";
import { MediaContext } from "@context/media/MediaContext";
import { Link } from "react-router-dom";
import ViewComments from "./ViewComments";
import MessageReactions from "./MessageReactions";

interface Props {
  posts: Post[];
  onRemovalClick?: (a: string) => void;
  allowRemoval?: boolean;
  onCreatePostClick?: () => void;
}
const ViewPosts = ({ posts, onRemovalClick, onCreatePostClick, allowRemoval }: Props) => {
  const [sortedPosts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();
  const { likePosts, accessToken } = useContext(AuthContext);
  const { postReply, updateLikePost, postMessageReply } = useContext(MediaContext);

  useEffect(() => {
    if (posts) {
      const sorted = sortList({ list: posts });

      setPosts(sorted as Post[]);
    }
  }, [posts]);

  if (!posts || posts.length === 0) {
    return !accessToken ? (
      <Link to="/login">Login to post comment!</Link>
    ) : (
      onCreatePostClick && <Button label="Create a post" onClick={onCreatePostClick} />
    );
  }
  const toggleActivePost = (p: Post) => {
    if (!activePost || activePost.postId !== p.postId) setActivePost(p);
    if (p.postId === activePost?.postId) setActivePost(undefined);
  };
  return (
    <div className="primary-container overflow-y z-1">
      {sortedPosts.map((post) => (
        <div key={post.uid} className="post highlight">
          {post.thumbnail && <Hero hero={{ url: post.thumbnail, alt: post.name }} theme="post-thumbnail" />}
          <CardTextBubble
            data={post}
            hero={post.createdBy ? { ...post.createdBy, url: post.createdBy.avatar, theme: "hero-contact-sm" } : undefined}
          />
          <MessageReactions
            likeList={likePosts}
            onLikeClick={() => updateLikePost(post.postId)}
            onRemovalClick={() => onRemovalClick && onRemovalClick(post.postId)}
            allowRemoval={allowRemoval}
            messageId={post.postId}
            onReplyClick={() => toggleActivePost(post)}
            commentPing={post.comments?.length}
            activeReply={activePost?.postId === post?.postId}
          />
          {post.postId === activePost?.postId && (
            <ViewComments
              comments={post.comments}
              reply={(val) => postReply({ reply: val, postId: post.postId, posts })}
              onMessageReply={(id, val) => postMessageReply({ messageId: id, reply: val, posts })}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default ViewPosts;
