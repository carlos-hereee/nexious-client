import { ImageBuffer } from "app-types";

export const bufferImage = (props: ImageBuffer) => {
  if (!props) return "";
  const { data, contentType } = props;
  // const base64String = Buffer.from(data.data, "binary").toString("base64");
  const base64String = btoa(String.fromCharCode(...new Uint8Array(data.data)));
  // console.log("props :>> ", props);
  // console.log("base64String :>> ", );
  if (contentType === "image/svg+xml") return `data:${contentType};utf8,${base64String}`;
  return `data:${contentType};base64,${base64String}`;
};
