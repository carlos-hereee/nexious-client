import { UserSchema } from "auth-context";

export const userMinData = (user: UserSchema) => {
  return {
    userId: user.userId || "",
    username: user.username || "",
    name: user.name || "",
    email: user.email || "",
    nickname: user.nickname || "",
    languageId: user.languageId || "",
    customerId: user.customerId || "",
    phone: user.phone || "",
  };
};
