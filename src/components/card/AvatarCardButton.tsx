import { Button, Hero } from "nexious-library";

interface P {
  user: {
    avatar: string;
    name: string;
  };
  theme?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const AvatarCardButton = ({ user, theme, onClick, children }: P) => {
  return (
    <Button theme={theme} onClick={onClick}>
      {user.avatar ? (
        <Hero hero={{ url: user.avatar, alt: `${user.name || "no-name"}-avatar"` }} theme="avatar-sm" />
      ) : (
        <strong>{user.name || "No name"}</strong>
      )}
      {children}
    </Button>
  );
};
export default AvatarCardButton;
