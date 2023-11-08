import { AddEntryProps } from "app-forms";

export const includeEntries = (entries: AddEntryProps[]) => {
  let payload: { [key: string]: any } = {};
  entries.forEach((entry) => {
    const { form, name, canMultiply, skipIfFalse } = entry;
    const { initialValues, labels, placeholders, types } = form;
    const { removalLabel, additionLabel } = form;
    payload[name] = {
      initialValues,
      labels,
      placeholders,
      types,
      canMultiply,
      removalLabel,
      additionLabel,
      skipIfFalse,
    };
  });
  return payload;
};
