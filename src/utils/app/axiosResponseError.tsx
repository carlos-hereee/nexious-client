import { isDev } from "@app/config";

export const axiosResponseError = (error: any, message: string) => {
  if (isDev) {
    console.log(`error occured ${message} :>> `, error);
    // dispatch({ type: "", payload: false });
  }
};
export const responseError = (error: any, message: string) => {
  if (isDev) {
    console.log(`error occured ${message} :>> `, error);
    // dispatch({ type: "", payload: false });
  }
};
// export responseError =
