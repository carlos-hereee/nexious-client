import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { OnclickProps } from "app-admin";
import { PreviewValueProps } from "app-forms";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";

const AddMedia = ({ onCancelClick }: OnclickProps) => {
  const { mediaEntryForm, addMedia, isLoading, mediaList } = useContext(AdminContext);
  const { appId } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");

  useEffect(() => {
    if (isLoading) setStatus("loading");
    else setStatus("idle");
  }, [isLoading]);

  const handleMedia = (values: PreviewValueProps) => {
    if (onCancelClick) onCancelClick();
    addMedia(values, appId);
  };
  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="flex-d-column">
      <Form
        initialValues={mediaEntryForm.initialValues}
        labels={mediaEntryForm.labels}
        placeholders={mediaEntryForm.placeholders}
        types={mediaEntryForm.types}
        dataList={{ media: mediaList }}
        heading="Add social media"
        onCancel={onCancelClick}
        onSubmit={handleMedia}
        submitLabel="Confirm"
        schema={{ required: ["media", "link"] }}
      />
    </div>
  );
};
export default AddMedia;
