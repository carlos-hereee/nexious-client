import { isDev } from "@config";
import { GenericErrorMessagesProps } from "app-errors";

export const genericErrorMessages = async (props: GenericErrorMessagesProps) => {
  const { error, type } = props;
  try {
    if (type === "auth") {
      console.log("type :>> ", type);
    }
    if (isDev) console.log("error :>> ", error);
  } catch (e) {
    if (isDev) console.log("e :>> ", e);
  }
};
