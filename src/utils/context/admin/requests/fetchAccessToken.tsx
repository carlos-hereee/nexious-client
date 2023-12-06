import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const fetchAccessToken = async (props: AdminDisptachProps) => {
  const { handleAppAssets } = props;
  const { data } = await axiosAuth.get("/auth/access-token");
  if (data) handleAppAssets(data);
};
