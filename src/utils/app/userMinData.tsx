import { UserSchema } from "auth-context";

export const userMinData = (user: UserSchema) => {
  return {
    userId: user.userId,
    username: user.username,
    email: user.email || "",
    nickname: user.nickname || "",
    languageId: user.languageId || "",
    phone: user.phone || "",
  };
};
