import { Hero } from "nexious-library";

interface P {
  user: {
    avatar: string;
    name: string;
  };
}
const AvatarCard = ({ user }: P) => {
  return (
    <div className="user-avatar-container">
      <Hero hero={{ url: user.avatar, alt: "user-avatar" }} theme="avatar-sm" />
      {user.name && <p> {user.name}</p>}
    </div>
  );
};
export default AvatarCard;
