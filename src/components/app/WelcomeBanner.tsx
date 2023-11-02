import { useContext } from "react";
import WelcomeMessage from "./WelcomeMessage";
import { AuthContext } from "@app/utils/context/auth/AuthContext";
import { AppContext } from "@app/utils/context/app/AppContext";
import { Select } from "nexious-library";

const WelcomeBanner = () => {
  const { user } = useContext(AuthContext);
  const { welcomeMessage, theme, themeList, setTheme } = useContext(AppContext);
  return (
    <div className="banner">
      <WelcomeMessage user={user} message={welcomeMessage} />
      <div className="flex-center">
        <div className="select-field">
          <Select
            name={theme}
            list={themeList}
            onChange={(event: any) => setTheme(event.target.value)}
            active={theme}
            label={"Theme: "}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};
export default WelcomeBanner;
