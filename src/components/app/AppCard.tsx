import { AuthContext } from "@context/auth/AuthContext";
import { AppCardProps } from "app-context";
import { Button, Hero } from "nexious-library";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import MediaContainer from "./containers/MediaContainer";

const AppCard = ({ app, theme, errorMessage }: AppCardProps) => {
  const { user } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSeeLive = () => {
    updateActiveAppData(app);
    navigate(`/${app.appUrl}`);
  };
  const handleNavigation = (link: string) => navigate(`/${link}/${app.appUrl}`);

  // if user has permissions
  const isAdmin = app.adminIds.some((admin) => admin.userId === user.userId);
  // logo alt data
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
