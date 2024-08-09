import { useEffect, useState } from "react";
import { CardTextBubble, Hero, IconButton } from "nexious-library";
import { Post } from "media-context";
import { sortList } from "@app/sortList";
import ViewComments from "./ViewComments";

interface Props {
  posts: Post[];
}
const ViewPosts = ({ posts }: Props) => {
  const [sortedPosts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();

  useEffect(() => {
    if (posts) {
      const sorted = sortList({ list: posts });
      setPosts(sorted as Post[]);
    }
  }, [posts]);
  if (!posts) return <h2 className="heading">No posts</h2>;
  // TODO: POST FUNCTIONALITY
  const handlePostCommentClick = (p: Post) => {
    setActivePost(p);
  };
  return (
    <div className="split-container">
      <div className="primary-container overflow-y">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div key={post.uid} className="post">
              {post.thumbnail && <Hero hero={{ url: post.thumbnail, alt: post.name }} theme="post-thumbnail m-auto p-1" />}
              <CardTextBubble data={post} />
              <div className="container p-1">
                <div className="flex-g">
                  <IconButton icon={{ icon: "heart" }} theme="highlight" />
                  <IconButton
                    icon={{ icon: "comment" }}
                    theme={`highlight${post.postId === activePost?.postId ? " btn-active" : ""}`}
                    onClick={() => handlePostCommentClick(post)}
                  />
                </div>
                {post.postId === activePost?.postId && <ViewComments comments={post.comments} />}
              </div>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
      <div className="container" />
    </div>
  );
};
export default ViewPosts;
