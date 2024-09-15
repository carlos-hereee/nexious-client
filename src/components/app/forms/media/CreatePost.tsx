// import { AppContext } from "@context/app/AppContext";
// import { MediaContext } from "@context/media/MediaContext";
import { postForm } from "@data/forms.json";
import { Post } from "media-context";
import { Form } from "nexious-library";
// import { useContext } from "react";

interface P {
  onSubmit?: (val: Post) => void;
}
const CreatePost = ({ onSubmit }: P) => {
  // const { addPost } = useContext(MediaContext);
  // // const { appId, inventory } = useContext(AppContext);
  // const { appId } = useContext(AppContext);
  // console.log("inventory :>> ", inventory);

  return (
    <div className="primary-container">
      <Form
        initialValues={postForm.initialValues}
        types={postForm.types}
        labels={postForm.labels}
        // dataList={postForm.labels}
        withFileUpload
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CreatePost;
