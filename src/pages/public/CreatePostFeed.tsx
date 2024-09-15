import CreatePost from "@components/app/forms/media/CreatePost";
import { UserContext } from "@context/user/UserContext";
import { useContext } from "react";
// import { Button } from "nexious-library";

const CreatePostFeed = () => {
  const { addPost } = useContext(UserContext);

  return (
    <div className="primary-container">
      <CreatePost onSubmit={(post) => addPost({ post })} />
      {/* <Button label="Create a post" /> */}
    </div>
  );
};
export default CreatePostFeed;
