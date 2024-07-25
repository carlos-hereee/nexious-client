import { MediaContext } from "@context/media/MediaContext";
import { useContext } from "react";
import { Button } from "nexious-library";

const ViewPosts = () => {
  const { posts } = useContext(MediaContext);
  console.log("posts :>> ", posts);

  if (!posts) return <h2 className="heading">No posts</h2>;
  return (
    <div className="primary-container">
      <h2 className="heading">Posts</h2>
      <div className="scroll-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.uid} className="w-max">
              <Button theme="btn-main btn-review">
                <span className="w-max">{post.body}</span>
              </Button>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
  );
};
export default ViewPosts;
