import { MediaContext } from "@context/media/MediaContext";
import { useContext, useEffect, useState } from "react";
import { Button, Hero } from "nexious-library";
import { Post } from "media-context";
import { sortList } from "@app/sortList";

const ViewPosts = () => {
  const { posts } = useContext(MediaContext);
  const [sortedPosts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      const sorted = sortList({ list: posts });
      setPosts(sorted as Post[]);
    }
  }, [posts]);

  if (!posts) return <h2 className="heading">No posts</h2>;
  console.log("sortedPosts :>> ", sortedPosts);
  return (
    <div className="primary-container">
      <h2 className="heading">Posts</h2>
      <div className="scroll-container">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <Button key={post.uid} theme="btn-post highlight">
              {post.thumbnail && <Hero hero={{ url: post.thumbnail }} theme="post-thumbnail" />}
              {post.body}
            </Button>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
  );
};
export default ViewPosts;
