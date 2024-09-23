import { postForm } from "@data/forms.json";
import { Post } from "media-context";
import { Form } from "nexious-library";

interface P {
  onSubmit?: (val: Post) => void;
}
const CreatePost = ({ onSubmit }: P) => {
  return (
    <Form
      initialValues={postForm.initialValues}
      types={postForm.types}
      labels={postForm.labels}
      submitLabel="Create post"
      withFileUpload
      onSubmit={onSubmit}
    />
  );
};

export default CreatePost;
