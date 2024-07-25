import { AuthContext } from "@context/auth/AuthContext";
import { AppCardProps } from "app-context";
import { Button, Hero } from "nexious-library";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AppCard = ({ app, theme, errorMessage }: AppCardProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSeeLive = () => navigate(`${app.appUrl}`);
  const handleSetting = () => navigate(`/settings/${app.appLink || app.appUrl}`);
  // if user has permissions
  const isAdmin = app.adminIds.some((admin) => admin.userId === user.userId);
  // logo alt data
  const heroData = { url: app.logo, alt: `industry-brand-${app.appName}` };
  return (
    <div className={`app-card${theme ? ` ${theme}` : ""}`}>
      <button type="button" className="btn-card" onClick={handleSeeLive}>
        <Hero hero={heroData} theme="logo" />
        <h3 className="heading">{app?.appName || "No name"}</h3>
        {errorMessage && (
          <div className="card-row-body">
            {/* {app.media?.hasMedias && <MediaContainer data={{ medias: app.media.medias }} />} */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
      </button>
      {isAdmin && (
        <Button
          label="Settings"
          theme="btn-main"
          onClick={handleSetting}
          ping={app.notifications ? app.notifications.length || undefined : undefined}
        />
      )}
    </div>
  );
};
export default AppCard;
