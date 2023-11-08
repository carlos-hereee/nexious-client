import { KeyStringProp } from "app-types";
import { objToArray } from "nexious-library";

type SharedPayloadProps = {
  [key: string]: KeyStringProp;
};

export const formatSharedKeyData = (values: KeyStringProp[]) => {
  const uniqueData: SharedPayloadProps = {};
  for (let item = 0; item < values.length; item++) {
    const { sharedKey, value, name } = values[item];
    uniqueData[sharedKey] = { ...uniqueData[sharedKey], [name]: value };
  }
  return objToArray(uniqueData).map((data: SharedPayloadProps) => {
    const key = Object.keys(data)[0];
    return { ...data[key], uid: key };
  });
};
