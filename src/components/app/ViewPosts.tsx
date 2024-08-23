import { useContext, useEffect, useState } from "react";
import { CardTextBubble, Hero } from "nexious-library";
import { Post } from "media-context";
import { sortList } from "@app/sortList";
import { AuthContext } from "@context/auth/AuthContext";
import { MediaContext } from "@context/media/MediaContext";
import { Link } from "react-router-dom";
import CreateApp from "@components/card/CreateApp";
import ViewComments from "./ViewComments";
import MessageReactions from "./MessageReactions";

interface Props {
  posts: Post[];
}
const ViewPosts = ({ posts }: Props) => {
  const [sortedPosts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();
  const { likePosts, accessToken } = useContext(AuthContext);
  const { postReply, updateLikePost } = useContext(MediaContext);

  useEffect(() => {
    if (posts) {
      const sorted = sortList({ list: posts });

      setPosts(sorted as Post[]);
    }
  }, [posts]);

  if (!posts) return <h2 className="heading">No posts</h2>;

  const toggleActivePost = (p: Post) => {
    if (!activePost || activePost.postId !== p.postId) setActivePost(p);
    if (p.postId === activePost?.postId) setActivePost(undefined);
  };
  return (
    <div className="split-container">
      <div className="primary-container overflow-y">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div key={post.uid} className="post">
              {post.thumbnail && <Hero hero={{ url: post.thumbnail, alt: post.name }} theme="post-thumbnail" />}
              <CardTextBubble data={post} />
              <MessageReactions
                likeList={likePosts}
                onLikeClick={() => updateLikePost(post.postId)}
                messageId={post.postId}
                onReplyClick={() => toggleActivePost(post)}
                activeReply={activePost?.postId === post?.postId}
              />
              {post.postId === activePost?.postId && (
                <ViewComments comments={post.comments} reply={(val) => postReply({ reply: val, postId: post.postId, posts })} />
              )}
            </div>
          ))
        ) : accessToken ? (
          <Link to="/dashboard">No posts be the first to post!</Link>
        ) : (
          <CreateApp />
        )}
      </div>
      <div className="container" />
    </div>
  );
};
export default ViewPosts;
