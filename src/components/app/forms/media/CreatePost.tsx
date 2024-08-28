import { AppContext } from "@context/app/AppContext";
import { MediaContext } from "@context/media/MediaContext";
import { postForm } from "@data/forms.json";
import { Post } from "media-context";
import { Form } from "nexious-library";
import { useContext } from "react";

const CreatePost = () => {
  const { addPost } = useContext(MediaContext);
  // const { appId, inventory } = useContext(AppContext);
  const { appId } = useContext(AppContext);
  // console.log("inventory :>> ", inventory);

  const handleSubmit = (val: Post) => {
    addPost({ post: val, appId });
  };
  return (
    <div className="primary-container">
      {/* <div>

      </div> */}
      <Form
        initialValues={postForm.initialValues}
        types={postForm.types}
        labels={postForm.labels}
        // dataList={postForm.labels}
        withFileUpload
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreatePost;
