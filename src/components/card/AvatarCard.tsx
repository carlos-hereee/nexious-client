import { Hero } from "nexious-library";

interface P {
  user: {
    avatar: string;
    name: string;
  };
  theme?: string;
  children?: string;
}
const AvatarCard = ({ user, theme, children }: P) => {
  return (
    <div className={theme || "user-avatar-container"}>
      <Hero hero={{ url: user.avatar, alt: "user-avatar" }} theme="avatar-sm" />
      {user.name && <p> {user.name}</p>}
      {children}
    </div>
  );
};
export default AvatarCard;
