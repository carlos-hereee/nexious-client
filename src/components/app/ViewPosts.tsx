import { useEffect, useState } from "react";
import { CardTextBubble, IconButton } from "nexious-library";
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
  // TODO: POST FUNCTIONALITY
  return (
    <div className="primary-container overflow-y">
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div key={post.uid} className="post">
            <CardTextBubble data={post} />
            <div className="flex-g p-1">
              <IconButton icon={{ icon: "heart" }} theme="highlight" />
              <IconButton icon={{ icon: "comment" }} theme="highlight" />
            </div>
          </div>
        ))
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};
export default ViewPosts;
