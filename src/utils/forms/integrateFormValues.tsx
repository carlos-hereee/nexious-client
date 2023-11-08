import { FormValueProps, InitPaginateFormProps } from "app-forms";
import { includeEntries } from "./includeEntries";

export const integrateFormValues = (data: InitPaginateFormProps[]): FormValueProps[] => {
  let values: FormValueProps[] = [];
  data.forEach((formData) => {
    const { values, formId, addEntries, onSubmit, withFileUpload, schema } = formData;
    const { dataList, onViewPreview, previewLabel } = formData;
    const { heading, labels, placeholders, types, fieldHeading } = formData.form;
    const addEntry = addEntries ? includeEntries(addEntries) : undefined;
    // const initialValues = reOrderValues(values)
    const payload = {
      initialValues: values,
      placeholders,
      fieldHeading,
      formId,
      heading,
      labels,
      types,
      addEntry,
      onSubmit,
      withFileUpload,
      dataList,
      previewLabel,
      onViewPreview,
      schema,
    };
    values.push(payload);
    // setAppValues((prev) => [...prev, payload]);
  });
  return values;
  // setFormLoading(false);
};
