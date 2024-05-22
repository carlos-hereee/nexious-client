import { nexiousUrl } from "@data/nexious.json";

export const devMode = import.meta.env.VITE_NODE_ENV;
export const isDev = devMode === "development" || devMode === "dev";
export const serverUrl = import.meta.env.VITE_DB_BASE_URL;
export const clientUrl = import.meta.env.VITE_CLIENT_BASE_URL;
export const homeUrl: string = isDev ? "http://localhost:5173" : nexiousUrl;
