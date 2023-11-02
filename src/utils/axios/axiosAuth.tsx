import axios from "axios";
import { clientUrl, serverUrl } from "@app/config";

export const axiosAuth = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
  // timeout: 2500,
  headers: {
    "Access-Control-Allow-Origin": clientUrl,
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});
