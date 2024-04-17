import { clientUrl } from "@config";

export const readableUrlString = (string: string) => string.split(" ").join("+");
export const formatAppUrl = (link: string) => `${clientUrl}/app/${link}`;
export const formatStoreUrl = (appName: string, link?: string) => {
  if (link) return `${clientUrl}/store/${appName}/${link}`;
  return `${clientUrl}/store/${appName}`;
};
