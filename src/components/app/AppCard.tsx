import { AuthContext } from "@app/context/auth/AuthContext";
import { AppCardProps } from "app-context";
import { Button } from "nexious-library";
// import { Button, Hero } from "nexious-library";
import { useContext } from "react";
// import { bufferImage } from "@app/utils/app/bufferImage";
// import { imageFromBuffer } from "imagefrombuffer";
import { bufferImage } from "@app/utils/app/bufferImage";
import MediaContainer from "./MediaContainer";
// import { Buffer } from "node:buffer";

const AppCard = (props: AppCardProps) => {
  const { app, theme, errorMessage, handleSeeLive, handleNavigation, owner } = props;
  const { user } = useContext(AuthContext);

  const isAdmin = owner.userId === user.userId;
  // const base64String = app.logo.image && bufferImage(app?.logo?.image.data);
  // console.log("app :>> ", app.logo.image);
  return (
    <div className={theme}>
      {app.logo?.image?.data && (
        <img src={bufferImage(app.logo.image)} alt="" width={100} height={100} />
      )}
      {/* <Hero hero={app.logo} theme="logo" onImageClick={handleSeeLive} /> */}
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
