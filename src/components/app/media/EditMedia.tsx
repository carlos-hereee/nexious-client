import { AdminContext } from "@context/admin/AdminContext";
import { formatMediaItem } from "@forms/formatMediaItem";
import { MediaFormUpdateProps, PreviewValueProps } from "app-forms";
import { Form, Loading } from "nexious-library";
import { useContext, useState, useEffect } from "react";

const EditMedia = (props: MediaFormUpdateProps) => {
  const { onCancelClick, media, onSubmit } = props;
  const { mediaEntryForm, mediaList } = useContext(AdminContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading" | "init">("init");
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    if (status === "init") {
      // format media values
      const data = formatMediaItem({ media, desiredOrder: mediaEntryForm.desiredOrder });
      setFormValues(data);
      setStatus("idle");
    }
  }, [status]);

  const handleMedia = (values: PreviewValueProps) => {
    if (onCancelClick) onCancelClick();
    if (onSubmit) onSubmit(values);
  };
  if (status === "init") return <Loading message="loading data.." />;
  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="flex-d-column">
      {formValues && (
        <Form
          initialValues={formValues}
          labels={mediaEntryForm.labels}
          placeholders={mediaEntryForm.placeholders}
          types={mediaEntryForm.types}
          dataList={{ media: mediaList }}
          heading={`Update social media: ${media?.media || ""}`}
          onCancel={onCancelClick}
          onSubmit={handleMedia}
          cancelLabel="Delete"
          submitLabel="Confirm"
        />
      )}
    </div>
  );
};
export default EditMedia;
