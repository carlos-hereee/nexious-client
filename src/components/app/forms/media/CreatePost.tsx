import { AppContext } from "@context/app/AppContext";
import { MediaContext } from "@context/media/MediaContext";
import { postForm } from "@data/forms.json";
import { Post } from "media-context";
import { Form } from "nexious-library";
import { useContext } from "react";

const CreatePost = () => {
  const { addPost } = useContext(MediaContext);
  const { appId } = useContext(AppContext);
  return (
    <div className="primary-container">
      <Form
        initialValues={postForm.initialValues}
        types={postForm.types}
        labels={postForm.labels}
        onSubmit={(val: Post) => addPost({ post: val, appId })}
      />
    </div>
  );
};

export default CreatePost;
