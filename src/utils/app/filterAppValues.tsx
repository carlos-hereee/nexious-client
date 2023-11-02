import { FormValueProps } from "app-forms";

export const filterAppValues = (values: FormValueProps, desiredData: string[]) => {
  const payload: { [key: string]: string } = {};
  Object.keys(values).forEach((key) => {
    if (desiredData.includes(key)) payload[key] = values[key];
  });
  return payload;
};
