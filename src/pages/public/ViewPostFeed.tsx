import ViewPosts from "@components/app/ViewPosts";
import { MediaContext } from "@context/media/MediaContext";
import { useContext } from "react";

const ViewPostFeed = () => {
  const { posts } = useContext(MediaContext);

  return <ViewPosts posts={posts} />;
};
export default ViewPostFeed;
