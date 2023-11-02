const devMode = import.meta.env.VITE_NODE_ENV;
const isDev = devMode === "development" || devMode === "dev";
const serverUrl = import.meta.env.VITE_DB_BASE_URL;
const clientUrl = import.meta.env.VITE_CLIENT_BASE_URL;
export { isDev, serverUrl, clientUrl };
