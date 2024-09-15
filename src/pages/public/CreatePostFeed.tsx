import CreatePost from "@components/app/forms/media/CreatePost";
import { UserContext } from "@context/user/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from "nexious-library";

const CreatePostFeed = () => {
  const { addPost, userRequestStatus, setUserRequestStatus } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRequestStatus === "SUCCESS") {
      navigate("/feed");
      setUserRequestStatus("IDLE");
    }
  }, [userRequestStatus]);

  return (
    <div className="primary-container z-1">
      <CreatePost onSubmit={(post) => addPost({ post })} />
    </div>
  );
};
export default CreatePostFeed;
