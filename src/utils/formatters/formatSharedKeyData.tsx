import { KeyStringProp, SectionDataProps } from "app-types";
import { objToArray, urlFile } from "nexious-library";

type SharedPayloadProps = {
  [key: string]: KeyStringProp;
};

export const formatSharedKeyData = (values: KeyStringProp[]): SectionDataProps[] => {
  // keep track of unique ids
  const uniqueData: SharedPayloadProps = {};
  for (let item = 0; item < values.length; item += 1) {
    const { sharedKey, value, name } = values[item];
    // add unique data
    uniqueData[sharedKey] = { ...uniqueData[sharedKey], [name]: value };
  }
  return objToArray(uniqueData).map((data: SharedPayloadProps) => {
    const key = Object.keys(data)[0];
    return { ...data[key], uid: key, hero: urlFile(data[key].hero) };
  });
};
