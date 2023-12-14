import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import WelcomeMessage from "./WelcomeMessage";

const WelcomeBanner = () => {
  const { user } = useContext(AuthContext);
  const { welcomeMessage } = useContext(AppContext);
  return (
    <div className="banner">
      <WelcomeMessage user={user} message={welcomeMessage} />
    </div>
  );
};
export default WelcomeBanner;
