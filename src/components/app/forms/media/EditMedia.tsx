import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { formatInitialValues } from "@formatters/formatInitialFormValues";
import { MediaFormUpdateProps, AppValues } from "app-forms";
import { Form } from "nexious-library";
import { useContext } from "react";

const EditMedia = (props: MediaFormUpdateProps) => {
  const { onCancelClick, onSubmit } = props;
  const { mediaEntryForm, mediaList } = useContext(AdminContext);
  const { socialMedia } = useContext(AppContext);

  const initialValues = formatInitialValues({ media: socialMedia, desiredOrder: mediaEntryForm.desiredOrder });

  const handleMedia = (values: AppValues) => {
    if (onCancelClick) onCancelClick();
    if (onSubmit) onSubmit(values);
  };

  return (
    <div className="primary-container">
      {initialValues && (
        <Form
          initialValues={initialValues}
          labels={mediaEntryForm.labels}
          placeholders={mediaEntryForm.placeholders}
          types={mediaEntryForm.types}
          dataList={{ media: mediaList }}
          heading={`Update social media: ${socialMedia?.media || ""}`}
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
