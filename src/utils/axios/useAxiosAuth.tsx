import { useContext } from "react";
import { useAuth } from "@context/auth/AuthContext";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { clientUrl, serverUrl } from "@app/config";

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

export const useAxiosAuth = () => {
  const { accessToken, updateUser, setStranded, setAccessToken, setIsLoading } = useAuth();
  // // Add a request interceptor
  // api.interceptors.request.use(
  //   (config) => {
  //     // check if token is expired
  //     if (accessToken) {
  //       const decoded = jwtDecode(accessToken);
  //       console.log("decoded", decoded);
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     console.log("error occured with configuration is sent", error);
  //     // Do something with request error
  //   }
  // );
  // Add a response interceptor
  api.interceptors.response.use(
    (response) => {
      // on response success
      console.log("response", response);
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // in case server gives no response
      if (!error.response) {
        console.log("server is offline -- gave no response");
        setStranded(true);
        setAccessToken("");
        updateUser({ userId: "", username: "" });
      }
      const status = error.response?.status;
      // server is offline, rejected, or not found
      if (status === 403 || status === 404 || status === 400) {
        // console.log(typeof updateUser, typeof setAccessToken);
        updateUser({ userId: "", username: "" });
        setAccessToken("");
      }
      // Handle other response errors.
      return Promise.reject(error);
    }
  );
  return api;
};
