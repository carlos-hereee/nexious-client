import { clientUrl, serverUrl } from "@app/config";
import axios from "axios";
const api = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
  // timeout: 2500,
  headers: {
    "Access-Control-Allow-Origin": clientUrl,
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // update content type to form submit assets
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    console.log("error occured with configuration is sent", error);
    // Do something with request error
  }
);
// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export const axiosMedia = api;
