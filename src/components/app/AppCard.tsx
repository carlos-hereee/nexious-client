import { AuthContext } from "@app/context/auth/AuthContext";
import { AppCardProps } from "app-context";
import { Button, Hero } from "nexious-library";
import { useContext } from "react";
import MediaContainer from "./MediaContainer";

const AppCard = (props: AppCardProps) => {
  const { app, theme, errorMessage, handleSeeLive, handleNavigation, owner } = props;
  const { user } = useContext(AuthContext);

  const isAdmin = owner.userId === user.userId;
  const heroData = { url: app.logo, alt: `industry-brand-${app.appName}` };
  return (
    <div className={theme}>
      <Hero hero={heroData} theme="logo" onImageClick={handleSeeLive} />
      <div className="card-row-body">
        <h2 className="heading">{app?.appName || "No name"}</h2>
        {app.media && <MediaContainer data={app.media.medias} />}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="navigation-container">
          {/* {isAdmin && <Button label="Edit" onClick={() => handleNavigation("edit-app")} />} */}
          {isAdmin && <Button label="Settings" onClick={() => handleNavigation("settings")} />}
          <Button label="See live" onClick={handleSeeLive} />
        </div>
      </div>
    </div>
  );
};
export default AppCard;
