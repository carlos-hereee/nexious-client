import { AuthContext } from "@app/context/auth/AuthContext";
import { AppCardProps } from "app-context";
import { Button, Hero, Icon } from "nexious-library";
import { useContext } from "react";

const AppCard = (props: AppCardProps) => {
  const { app, theme, errorMessage, handleSeeLive, handleNavigation, owner } = props;
  const { user } = useContext(AuthContext);

  const isAdmin = owner.userId === user.userId;

  return (
    <div className={theme}>
      <Hero hero={app.logo} theme="logo" onImageClick={handleSeeLive} />
      <div className="card-row-body">
        <h2 className="heading">{app?.appName || "No name"}</h2>
        {app.media && (
          <div className="flex-gap">
            {app.media.medias.map((d) => (
              <a key={d.uid} className="nav-link" href={d.link || "#"}>
                {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
              </a>
            ))}
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="navigation-container">
          {isAdmin && <Button label="Edit" onClick={() => handleNavigation("edit-app")} />}
          {isAdmin && <Button label="Settings" onClick={() => handleNavigation("settings/app")} />}
          <Button label="See live" onClick={handleSeeLive} />
        </div>
      </div>
    </div>
  );
};
export default AppCard;
