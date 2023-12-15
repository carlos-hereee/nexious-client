import { clientUrl } from "@config";

export const readableUrlString = (string: string) => string.split(" ").join("+");
export const formatAppUrl = (string: string) => `${clientUrl}/app/${string}`;
