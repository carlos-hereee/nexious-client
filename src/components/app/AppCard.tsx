import { AuthContext } from "@context/auth/AuthContext";
import { AppCardProps } from "app-context";
import { Button, Hero } from "nexious-library";
import { useContext } from "react";
import MediaContainer from "./containers/MediaContainer";

const AppCard = (props: AppCardProps) => {
  const { app, theme, errorMessage, handleSeeLive, handleNavigation, owner } = props;
  const { user } = useContext(AuthContext);

  const isAdmin = owner.userId === user.userId;
  const heroData = { url: app.logo, alt: `industry-brand-${app.appName}` };
  return (
    <div className={`app-card${theme ? ` ${theme}` : ""}`}>
      <button type="button" className="btn-card" onClick={handleSeeLive}>
        <Hero hero={heroData} theme="logo" onImageClick={handleSeeLive} />
        <h2 className="heading">{app?.appName || "No name"}</h2>
        <div className="card-row-body">
          {app.media?.hasMedias && <MediaContainer data={{ medias: app.media.medias }} />}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </button>
      <div className="navigation-container">
        {isAdmin && <Button label="Settings" onClick={() => handleNavigation("settings")} />}
      </div>
    </div>
  );
};
export default AppCard;
