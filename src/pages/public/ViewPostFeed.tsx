import ViewPosts from "@components/app/ViewPosts";
import { AuthContext } from "@context/auth/AuthContext";
import { MediaContext } from "@context/media/MediaContext";
import { useContext } from "react";
import { Button } from "nexious-library";
import { useNavigate } from "react-router-dom";

const ViewPostFeed = () => {
  const { posts } = useContext(MediaContext);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      {accessToken && <Button theme="btn-add-post highlight" label="Create post" onClick={() => navigate("/feed/post")} />}
      <ViewPosts posts={posts} onCreatePostClick={() => navigate("/feed/post")} />
    </div>
  );
};
export default ViewPostFeed;
