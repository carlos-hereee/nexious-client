import { useContext, useEffect, useState } from "react";
import { CardTextBubble, Hero, IconButton } from "nexious-library";
import { Post } from "media-context";
import { sortList } from "@app/sortList";
import { AuthContext } from "@context/auth/AuthContext";
import ViewComments from "./ViewComments";

interface Props {
  posts: Post[];
}
const ViewPosts = ({ posts }: Props) => {
  const [sortedPosts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post>();
  const { likePosts, updateLikePost } = useContext(AuthContext);

  useEffect(() => {
    if (posts) {
      const sorted = sortList({ list: posts });
      setPosts(sorted as Post[]);
    }
  }, [posts]);

  if (!posts) return <h2 className="heading">No posts</h2>;

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
                  <IconButton
                    icon={{ icon: "heart" }}
                    theme={`btn-small highlight ${likePosts.includes(post.postId) ? ` btn-like-icon` : ""}`}
                    onClick={() => updateLikePost(post.uid)}
                  />
                  <IconButton
                    icon={{ icon: "comment" }}
                    theme={`highlight btn-small${post.postId === activePost?.postId ? " btn-selected highlight" : ""}`}
                    onClick={() => setActivePost(post)}
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
