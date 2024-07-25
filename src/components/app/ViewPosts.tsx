import { useEffect, useState } from "react";
import { Button, Hero } from "nexious-library";
import { Post } from "media-context";
import { sortList } from "@app/sortList";

interface Props {
  posts: Post[];
}
const ViewPosts = ({ posts }: Props) => {
  const [sortedPosts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (posts) {
      const sorted = sortList({ list: posts });
      setPosts(sorted as Post[]);
    }
  }, [posts]);

  if (!posts) return <h2 className="heading">No posts</h2>;
  return (
    <div className="primary-container overflow-y">
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
  );
};
export default ViewPosts;
