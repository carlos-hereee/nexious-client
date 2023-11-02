import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { isDev } from "@app/config";

export const uploadImage = async (dispatch, file, onUploadProgress) => {
  // console.log("asset", asset);
  try {
    let formData = new FormData();
    formData.append("file", file);
    const data = await axiosMedia.post("/app/file-upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    });
    console.log("data", data);
  } catch (error) {
    if (isDev) console.log("upload image error ", error);
    const { status, data } = error.response;
    dispatch({ type: "SET_UPLOAD_ERROR", payload: data });
  }
};
